'use client';

import { useCallback, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { COMPANY } from '@/lib/constants';
import type { Plan } from '@/types/plan';
import type { RazorpayFailureResponse } from '@/types/global';

interface RazorpayCheckoutProps {
    plan: Plan;
    onClose: () => void;
}

interface OrderData {
    orderId: string;
    currency: string;
    amount: number;
    receipt: string;
    razorpayKeyId: string;
}

let razorpayScriptPromise: Promise<boolean> | null = null;

function loadRazorpayScript(): Promise<boolean> {
    if (typeof window === 'undefined') {
        return Promise.resolve(false);
    }

    if (window.Razorpay) {
        return Promise.resolve(true);
    }

    if (razorpayScriptPromise) {
        return razorpayScriptPromise;
    }

    razorpayScriptPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

    return razorpayScriptPromise;
}

function Spinner() {
    return <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent align-middle' />;
}

export default function RazorpayCheckout({ plan, onClose }: RazorpayCheckoutProps) {
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const bookingAmountPaise = useMemo(() => plan.bookingAmountRupees * 100, [plan.bookingAmountRupees]);
    const amountLabel = useMemo(() => `₹${(bookingAmountPaise / 100).toFixed(0)}`, [bookingAmountPaise]);

    const handleChange = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const notifyFailure = async (title: string, message: string) => {
        const { default: Notiflix } = await import('notiflix');
        Notiflix.Notify.failure(message);
        Notiflix.Report.failure(title, message, 'Okay');
    };

    const openCheckout = useCallback(
        async (orderData: OrderData) => {
            const options = {
                key: orderData.razorpayKeyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: COMPANY.name,
                description: `${plan.title} booking amount`,
                order_id: orderData.orderId,
                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phone,
                },
                notes: {
                    planId: String(plan.id),
                    planName: plan.title,
                    receipt: orderData.receipt,
                },
                theme: {
                    color: '#6366f1',
                },
                modal: {
                    ondismiss: async () => {
                        setLoading(false);
                        setError('Payment popup closed. You can try again.');
                        await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: orderData.orderId,
                                failureReason: 'Customer closed payment popup.',
                            }),
                        }).catch(() => {
                            // Dismissal marking is best-effort only.
                        });
                    },
                },
                handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
                    try {
                        const verifyRes = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(response),
                        });

                        const verifyData = await verifyRes.json();
                        if (!verifyRes.ok || !verifyData.success) {
                            throw new Error(verifyData.error || 'Payment verification failed.');
                        }

                        window.location.href = `/payment/success?orderId=${encodeURIComponent(verifyData.orderId)}`;
                    } catch (verifyError) {
                        const message = verifyError instanceof Error ? verifyError.message : 'Payment verification failed.';
                        setError(message);
                        setLoading(false);
                        await notifyFailure('Verification Failed', message);
                        window.location.href = `/payment/failed?orderId=${encodeURIComponent(orderData.orderId)}&reason=${encodeURIComponent(message)}`;
                    }
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', async (response: RazorpayFailureResponse) => {
                const reason = response?.error?.description || response?.error?.reason || 'Payment failed. Please try again.';
                setError(reason);
                setLoading(false);

                await fetch('/api/payment/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        razorpay_order_id: orderData.orderId,
                        razorpay_payment_id: response?.error?.metadata?.payment_id || null,
                        failureReason: reason,
                    }),
                }).catch(() => {
                    // Failure marking is best-effort only.
                });

                await notifyFailure('Payment Failed', reason);
                window.location.href = `/payment/failed?orderId=${encodeURIComponent(orderData.orderId)}&reason=${encodeURIComponent(reason)}`;
            });

            razorpay.open();
        },
        [form.email, form.name, form.phone, plan.id, plan.title]
    );

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loading) {
            return;
        }

        setError('');
        setLoading(true);

        try {
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error('Unable to load Razorpay checkout. Please retry.');
            }

            const response = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planId: plan.id,
                    planName: plan.title,
                    amount: bookingAmountPaise,
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                }),
            });

            const orderData = await response.json();
            if (!response.ok) {
                throw new Error(orderData.error || 'Unable to create order.');
            }

            await openCheckout(orderData);
        } catch (checkoutError) {
            const message = checkoutError instanceof Error ? checkoutError.message : 'Something went wrong while starting payment.';
            setError(message);
            setLoading(false);
            await notifyFailure('Checkout Error', message);
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4' onClick={onClose}>
            <div
                className='bg-canvas border-hairline relative w-full max-w-sm rounded-xl border p-5'
                onClick={(event) => event.stopPropagation()}>
                <button
                    type='button'
                    onClick={onClose}
                    aria-label='Close'
                    disabled={loading}
                    className='text-fg-muted hover:text-fg absolute right-3 top-3 text-xl leading-none disabled:opacity-50'>
                    &times;
                </button>

                <h3 className='text-fg mb-1 font-display text-lg font-bold'>{plan.title}</h3>
                <p className='text-fg-muted mb-3 text-sm'>Listed price: {plan.price}</p>

                <div className='glass-panel mb-4 rounded-lg p-3'>
                    <p className='text-fg text-sm font-semibold'>{amountLabel} Booking Fee</p>
                    <p className='text-fg-muted mt-1 text-xs'>
                        Your booking amount secures a development slot with our team and will be adjusted in your final invoice.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-3'>
                    <input
                        required
                        type='text'
                        placeholder='Full Name*'
                        value={form.name}
                        onChange={handleChange('name')}
                        className='text-fg placeholder:text-fg-muted w-full rounded-lg bg-slate-900/5 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-white/5'
                    />
                    <input
                        required
                        type='email'
                        placeholder='Email*'
                        value={form.email}
                        onChange={handleChange('email')}
                        className='text-fg placeholder:text-fg-muted w-full rounded-lg bg-slate-900/5 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-white/5'
                    />
                    <input
                        required
                        type='tel'
                        placeholder='Phone*'
                        value={form.phone}
                        onChange={handleChange('phone')}
                        className='text-fg placeholder:text-fg-muted w-full rounded-lg bg-slate-900/5 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-white/5'
                    />

                    {error && <p className='text-xs text-red-500 dark:text-red-400'>{error}</p>}

                    <button
                        type='submit'
                        disabled={loading}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-accent-400 px-4 py-2.5 text-center text-sm font-bold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60'>
                        {loading ? <Spinner /> : null}
                        {loading ? 'Processing...' : `Pay ${amountLabel} & Book Your Slot`}
                    </button>
                </form>
            </div>
        </div>
    );
}
