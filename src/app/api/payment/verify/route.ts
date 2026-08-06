import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAndCapturePayment, markFailedPayment, PaymentServiceError } from '@/services/payment.service';
import { enforceRateLimit, getClientIp } from '@/utils/rateLimit';
import { isNonEmptyString } from '@/utils/validation';

export async function POST(request: NextRequest) {
    const ip = getClientIp(request);
    const limit = enforceRateLimit({ key: `payment:verify:${ip}`, limit: 20, windowMs: 60_000 });
    if (!limit.allowed) {
        return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
    }

    const {
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        razorpay_signature: signature,
        failureReason,
    } = body || {};

    if (!isNonEmptyString(orderId)) {
        return NextResponse.json({ error: 'Missing order id.' }, { status: 400 });
    }

    try {
        await connectToDatabase();

        if (!isNonEmptyString(paymentId) || !isNonEmptyString(signature)) {
            await markFailedPayment({
                orderId,
                paymentId: isNonEmptyString(paymentId) ? paymentId : null,
                reason: isNonEmptyString(failureReason) ? failureReason : 'Payment was cancelled or failed before verification.',
            }).catch((error) => {
                console.error('[api/payment/verify] failed to mark payment as failed', error);
            });

            return NextResponse.json({ success: false, error: 'Payment failed or was cancelled.' }, { status: 400 });
        }

        const { payment, booking } = await verifyAndCapturePayment({ orderId, paymentId, signature });

        return NextResponse.json({
            success: true,
            bookingId: booking._id?.toString(),
            paymentId: payment.paymentId,
            orderId: payment.orderId,
            receipt: payment.receipt,
            planName: payment.planName,
            amount: payment.bookingAmount,
            date: payment.updatedAt,
        });
    } catch (error) {
        if (error instanceof PaymentServiceError) {
            return NextResponse.json({ success: false, error: error.message }, { status: error.status });
        }

        const message = error instanceof Error ? error.message : '';
        if (message.includes('Unable to reach MongoDB Atlas')) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Database connection unavailable. Please whitelist your current IP in MongoDB Atlas and retry.',
                },
                { status: 503 }
            );
        }

        console.error('[api/payment/verify] failed', error);
        return NextResponse.json({ success: false, error: 'Payment verification failed.' }, { status: 500 });
    }
}
