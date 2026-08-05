import crypto from 'crypto';
import { BOOKING_AMOUNT_RUPEES, BOOKING_AMOUNT_PAISE } from '@/lib/payment-constants';

export { BOOKING_AMOUNT_RUPEES, BOOKING_AMOUNT_PAISE };

export function parsePlanPriceToRupees(planPriceText) {
    if (!planPriceText) return null;

    const clean = String(planPriceText).replace(/,/g, '');
    const match = clean.match(/(\d+(?:\.\d+)?)/);

    if (!match) return null;

    const amount = Number.parseFloat(match[1]);
    if (!Number.isFinite(amount)) return null;

    return Math.round(amount);
}

export function verifyRazorpaySignature({ orderId, paymentId, signature, secret }) {
    const payload = `${orderId}|${paymentId}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    const expectedBuf = Buffer.from(expected, 'utf8');
    const signatureBuf = Buffer.from(signature || '', 'utf8');

    if (expectedBuf.length !== signatureBuf.length) {
        return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
}

export function verifyRazorpayWebhookSignature({ body, signature, secret }) {
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
    const expectedBuf = Buffer.from(expected, 'utf8');
    const signatureBuf = Buffer.from(signature || '', 'utf8');

    if (expectedBuf.length !== signatureBuf.length) {
        return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
}
