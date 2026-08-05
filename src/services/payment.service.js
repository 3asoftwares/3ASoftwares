import Payment from '@/models/Payment';
import Booking from '@/models/Booking';
import { PLANS, getBookingAmountPaiseByPlanId } from '@/lib/constants';
import { getRazorpayClient, getRazorpaySecretByMode } from '@/lib/razorpay';
import { parsePlanPriceToRupees, verifyRazorpaySignature } from '@/utils/payment';

export class PaymentServiceError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = 'PaymentServiceError';
        this.status = status;
    }
}

function toYmd(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}

export async function generateReceiptNumber() {
    const datePrefix = toYmd();
    const regex = new RegExp(`^BK-${datePrefix}-`);
    const count = await Payment.countDocuments({ receipt: { $regex: regex } });
    return `BK-${datePrefix}-${String(count + 1).padStart(4, '0')}`;
}

export async function createBookingOrder({ planId, planName, amount, customerName, customerEmail, customerPhone, userId = null, gatewayMode = 'test' }) {
    const razorpay = getRazorpayClient(gatewayMode);
    const normalizedPlanId = Number(planId);
    const normalizedAmount = Number(amount);
    const bookingAmountPaise = getBookingAmountPaiseByPlanId(normalizedPlanId);

    if (!Number.isInteger(normalizedPlanId) || normalizedAmount !== bookingAmountPaise) {
        throw new PaymentServiceError('Invalid order payload.', 400);
    }

    const plan = PLANS.find((p) => p.id === normalizedPlanId);
    if (!plan || plan.title !== planName) {
        throw new PaymentServiceError('Plan validation failed.', 400);
    }

    const now = Date.now();
    const activeWindow = new Date(now - 15 * 60 * 1000);
    const existingPending = await Payment.findOne({
        planId: normalizedPlanId,
        customerEmail: customerEmail.toLowerCase().trim(),
        status: 'PENDING',
        createdAt: { $gte: activeWindow },
    }).sort({ createdAt: -1 });

    if (existingPending) {
        return {
            orderId: existingPending.orderId,
            currency: existingPending.currency,
            amount: existingPending.bookingAmount,
            receipt: existingPending.receipt,
        };
    }

    const receipt = await generateReceiptNumber();
    const razorpayOrder = await razorpay.orders.create({
        amount: bookingAmountPaise,
        currency: 'INR',
        receipt,
        notes: {
            planId: String(normalizedPlanId),
            planName,
        },
    });

    const fullPlanAmount = parsePlanPriceToRupees(plan.price);
    await Payment.create({
        userId,
        planId: normalizedPlanId,
        planName,
        bookingAmount: bookingAmountPaise,
        fullPlanAmount,
        currency: razorpayOrder.currency,
        paymentId: null,
        orderId: razorpayOrder.id,
        signature: null,
        status: 'PENDING',
        paymentMethod: null,
        receipt,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        customerPhone: customerPhone.trim(),
        notes: { source: 'checkout', gatewayMode },
    });

    return {
        orderId: razorpayOrder.id,
        currency: razorpayOrder.currency,
        amount: razorpayOrder.amount,
        receipt,
    };
}

export async function markFailedPayment({ orderId, paymentId = null, reason = 'Payment failed', method = null }) {
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
        throw new PaymentServiceError('Payment record not found.', 404);
    }

    if (payment.status === 'SUCCESS') {
        return payment;
    }

    payment.status = 'FAILED';
    payment.failureReason = reason;
    payment.paymentId = paymentId || payment.paymentId;
    payment.paymentMethod = method || payment.paymentMethod;
    await payment.save();

    return payment;
}

export async function ensureBookingFromPayment(payment) {
    const existing = await Booking.findOne({ orderId: payment.orderId });
    if (existing) {
        return existing;
    }

    const fullPlanAmount = payment.fullPlanAmount;
    const bookingAmountRupees = Number(payment.bookingAmount) / 100;
    const remainingAmount = Number.isFinite(fullPlanAmount) ? Math.max(fullPlanAmount - bookingAmountRupees, 0) : null;

    const booking = await Booking.create({
        userId: payment.userId,
        planId: payment.planId,
        planName: payment.planName,
        status: 'BOOKED',
        bookingAmount: payment.bookingAmount,
        fullPlanAmount,
        remainingAmount,
        currency: payment.currency,
        paymentId: payment.paymentId,
        orderId: payment.orderId,
        receipt: payment.receipt,
        customerName: payment.customerName,
        customerEmail: payment.customerEmail,
        customerPhone: payment.customerPhone,
    });

    return booking;
}

export async function verifyAndCapturePayment({ orderId, paymentId, signature }) {
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
        throw new PaymentServiceError('Payment record not found.', 404);
    }

    const gatewayMode = payment?.notes?.gatewayMode || 'test';
    const razorpay = getRazorpayClient(gatewayMode);
    const secret = getRazorpaySecretByMode(gatewayMode);

    if (!secret) {
        throw new PaymentServiceError(`Missing Razorpay secret for ${gatewayMode} mode.`, 500);
    }

    if (payment.status === 'SUCCESS') {
        const existingBooking = await ensureBookingFromPayment(payment);
        return { payment, booking: existingBooking };
    }

    const valid = verifyRazorpaySignature({
        orderId,
        paymentId,
        signature,
        secret,
    });

    if (!valid) {
        payment.status = 'FAILED';
        payment.failureReason = 'Signature mismatch';
        await payment.save();
        throw new PaymentServiceError('Signature verification failed.', 400);
    }

    let paymentMethod = null;
    try {
        const fetchedPayment = await razorpay.payments.fetch(paymentId);
        paymentMethod = fetchedPayment?.method || null;
    } catch (error) {
        console.error('[payment.service] failed to fetch payment method', { orderId, paymentId, error: error.message });
    }

    payment.status = 'SUCCESS';
    payment.paymentId = paymentId;
    payment.signature = signature;
    payment.paymentMethod = paymentMethod;
    payment.failureReason = null;
    await payment.save();

    const booking = await ensureBookingFromPayment(payment);
    return { payment, booking };
}

export async function handleWebhookPaymentState({ orderId, paymentId, eventType, method = null, reason = null }) {
    const payment = await Payment.findOne({ orderId });

    if (!payment) {
        return null;
    }

    if (eventType === 'payment.failed') {
        if (payment.status !== 'SUCCESS') {
            payment.status = 'FAILED';
            payment.failureReason = reason || 'Payment failed';
            payment.paymentId = paymentId || payment.paymentId;
            payment.paymentMethod = method || payment.paymentMethod;
            await payment.save();
        }
        return { payment, booking: null };
    }

    if (eventType === 'payment.captured' || eventType === 'order.paid') {
        if (payment.status !== 'SUCCESS') {
            payment.status = 'SUCCESS';
            payment.paymentId = paymentId || payment.paymentId;
            payment.paymentMethod = method || payment.paymentMethod;
            payment.failureReason = null;
            await payment.save();
        }

        const booking = await ensureBookingFromPayment(payment);
        return { payment, booking };
    }

    return { payment, booking: null };
}
