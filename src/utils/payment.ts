import crypto from 'crypto';

export function parsePlanPriceToRupees(planPriceText?: string | null): number | null {
    if (!planPriceText) return null;

    const clean = String(planPriceText).replace(/,/g, '');
    const match = clean.match(/(\d+(?:\.\d+)?)/);

    if (!match) return null;

    const amount = Number.parseFloat(match[1]);
    if (!Number.isFinite(amount)) return null;

    return Math.round(amount);
}

export interface VerifyRazorpaySignatureParams {
    orderId: string;
    paymentId: string;
    signature?: string | null;
    secret: string;
}

export function verifyRazorpaySignature({ orderId, paymentId, signature, secret }: VerifyRazorpaySignatureParams): boolean {
    const payload = `${orderId}|${paymentId}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    const expectedBuf = Buffer.from(expected, 'utf8');
    const signatureBuf = Buffer.from(signature || '', 'utf8');

    if (expectedBuf.length !== signatureBuf.length) {
        return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
}

export interface VerifyRazorpayWebhookSignatureParams {
    body: string;
    signature?: string | null;
    secret: string;
}

export function verifyRazorpayWebhookSignature({ body, signature, secret }: VerifyRazorpayWebhookSignatureParams): boolean {
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
    const expectedBuf = Buffer.from(expected, 'utf8');
    const signatureBuf = Buffer.from(signature || '', 'utf8');

    if (expectedBuf.length !== signatureBuf.length) {
        return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
}
