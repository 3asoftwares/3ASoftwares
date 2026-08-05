import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyRazorpayWebhookSignature } from '@/utils/payment';
import { handleWebhookPaymentState } from '@/services/payment.service';
import WebhookEvent from '@/models/WebhookEvent';
import { getAvailableRazorpaySecrets } from '@/lib/razorpay';

export async function POST(request) {
    const signature = request.headers.get('x-razorpay-signature');
    const eventId = request.headers.get('x-razorpay-event-id');
    const rawBody = await request.text();

    if (!signature || !eventId) {
        return NextResponse.json({ error: 'Missing webhook headers.' }, { status: 400 });
    }

    const secrets = getAvailableRazorpaySecrets();
    if (secrets.length === 0) {
        return NextResponse.json({ error: 'No Razorpay webhook secret configured.' }, { status: 500 });
    }

    const isValid = secrets.some((secret) =>
        verifyRazorpayWebhookSignature({
            body: rawBody,
            signature,
            secret,
        })
    );

    if (!isValid) {
        return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
    }

    let payload;
    try {
        payload = JSON.parse(rawBody);
    } catch {
        return NextResponse.json({ error: 'Invalid webhook payload.' }, { status: 400 });
    }

    try {
        await connectToDatabase();

        const alreadyProcessed = await WebhookEvent.findOne({ eventId });
        if (alreadyProcessed) {
            return NextResponse.json({ status: 'ok', duplicate: true });
        }

        const eventType = payload?.event;
        const paymentEntity = payload?.payload?.payment?.entity;
        const orderEntity = payload?.payload?.order?.entity;

        const orderId = paymentEntity?.order_id || orderEntity?.id || null;
        const paymentId = paymentEntity?.id || null;
        const method = paymentEntity?.method || null;
        const reason = paymentEntity?.error_description || paymentEntity?.error_reason || null;

        await WebhookEvent.create({
            provider: 'RAZORPAY',
            eventId,
            eventType: eventType || 'unknown',
            orderId,
            paymentId,
            payload,
        });

        if (orderId && eventType) {
            await handleWebhookPaymentState({ orderId, paymentId, eventType, method, reason });
        }

        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        if (String(error?.message || '').includes('Unable to reach MongoDB Atlas')) {
            return NextResponse.json({ error: 'Database temporarily unavailable.' }, { status: 503 });
        }

        console.error('[api/payment/webhook] failed', error);
        return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 });
    }
}
