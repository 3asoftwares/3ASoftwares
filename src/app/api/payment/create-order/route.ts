import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { createBookingOrder, PaymentServiceError } from '@/services/payment.service';
import { getPlanById } from '@/services/plan.service';
import { getRazorpayModeFromHost, getRazorpayPublicKeyByMode } from '@/lib/razorpay';
import { enforceRateLimit, getClientIp } from '@/utils/rateLimit';
import { isNonEmptyString, isEmail, isPhone } from '@/utils/validation';

export async function POST(request: NextRequest) {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
    const gatewayMode = getRazorpayModeFromHost(host);
    const razorpayKeyId = getRazorpayPublicKeyByMode(gatewayMode);

    if (!razorpayKeyId) {
        return NextResponse.json({ error: `Missing Razorpay public key for ${gatewayMode} mode.` }, { status: 500 });
    }

    const ip = getClientIp(request);
    const limit = enforceRateLimit({ key: `payment:create-order:${ip}`, limit: 10, windowMs: 60_000 });
    if (!limit.allowed) {
        return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
    }

    const { planId, planName, amount, name, email, phone } = body || {};

    if (!Number.isInteger(Number(planId)) || !isNonEmptyString(planName)) {
        return NextResponse.json({ error: 'Invalid plan details.' }, { status: 400 });
    }

    if (!isNonEmptyString(name) || !isEmail(email) || !isPhone(phone)) {
        return NextResponse.json({ error: 'Please provide valid name, email, and phone.' }, { status: 400 });
    }

    try {
        await connectToDatabase();

        const plan = await getPlanById(Number(planId));
        if (!plan || plan.title !== planName) {
            return NextResponse.json({ error: 'Plan validation failed.' }, { status: 400 });
        }

        const expectedAmount = plan.bookingAmountRupees * 100;
        if (Number(amount) !== expectedAmount) {
            return NextResponse.json({ error: 'Invalid booking amount.' }, { status: 400 });
        }

        const order = await createBookingOrder({
            planId: planId as number,
            planName: planName as string,
            amount: amount as number,
            customerName: name as string,
            customerEmail: email as string,
            customerPhone: phone as string,
            gatewayMode,
        });

        return NextResponse.json({
            ...order,
            gatewayMode,
            razorpayKeyId,
        });
    } catch (error) {
        if (error instanceof PaymentServiceError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }

        const message = error instanceof Error ? error.message : '';
        if (message.includes('Unable to reach MongoDB Atlas')) {
            return NextResponse.json(
                {
                    error: 'Database connection unavailable. Please whitelist your current IP in MongoDB Atlas and retry.',
                },
                { status: 503 }
            );
        }

        console.error('[api/payment/create-order] failed', error);
        return NextResponse.json({ error: 'Failed to create order. Please retry.' }, { status: 500 });
    }
}
