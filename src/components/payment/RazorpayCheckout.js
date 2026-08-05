'use client';

import { useCallback, useMemo, useState } from 'react';
import { BOOKING_AMOUNT_PAISE } from '@/lib/payment-constants';

let razorpayScriptPromise = null;

function loadRazorpayScript() {
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
    return (
        <span className='inline-block h-5 w-5 animate-spin rounded-full border-2 border-black border-r-transparent align-middle' />
    );
}

export default function RazorpayCheckout({ plan, onClose }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const amountLabel = useMemo(() => `₹${(BOOKING_AMOUNT_PAISE / 100).toFixed(0)}`, []);

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const notifyFailure = async (title, message) => {
        const { default: Notiflix } = await import('notiflix');
        Notiflix.Notify.failure(message);
        Notiflix.Report.failure(title, message, 'Okay');
    };

    const openCheckout = useCallback(
        async (orderData) => {
            const options = {
                key: orderData.razorpayKeyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: '3A Softwares',
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
                    color: '#4b5563',
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
                handler: async (response) => {
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
                        const message = verifyError?.message || 'Payment verification failed.';
                        setError(message);
                        setLoading(false);
                        await notifyFailure('Verification Failed', message);
                        window.location.href = `/payment/failed?orderId=${encodeURIComponent(orderData.orderId)}&reason=${encodeURIComponent(message)}`;
                    }
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', async (response) => {
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

    const handleSubmit = async (event) => {
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
                    amount: BOOKING_AMOUNT_PAISE,
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
            const message = checkoutError?.message || 'Something went wrong while starting payment.';
            setError(message);
            setLoading(false);
            await notifyFailure('Checkout Error', message);
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4' onClick={onClose}>
            <div className='relative w-full max-w-md rounded-2xl bg-white p-6 md:p-8' onClick={(event) => event.stopPropagation()}>
                <button
                    type='button'
                    onClick={onClose}
                    aria-label='Close'
                    disabled={loading}
                    className='absolute right-4 top-4 text-2xl leading-none text-gray-400 hover:text-gray-700 disabled:opacity-50'>
                    &times;
                </button>

                <h3 className='mb-1 text-2xl font-bold text-gray-900'>{plan.title}</h3>
                <p className='mb-4 text-gray-500'>Listed price: {plan.price}</p>

                <div className='mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4'>
                    <p className='font-semibold text-gray-800'>{amountLabel} Booking Fee</p>
                    <p className='mt-1 text-sm text-gray-600'>
                        Your booking amount secures a development slot with our team and will be adjusted in your final invoice.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        required
                        type='text'
                        placeholder='Full Name*'
                        value={form.name}
                        onChange={handleChange('name')}
                        className='w-full rounded-lg bg-gray-100 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400'
                    />
                    <input
                        required
                        type='email'
                        placeholder='Email*'
                        value={form.email}
                        onChange={handleChange('email')}
                        className='w-full rounded-lg bg-gray-100 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400'
                    />
                    <input
                        required
                        type='tel'
                        placeholder='Phone*'
                        value={form.phone}
                        onChange={handleChange('phone')}
                        className='w-full rounded-lg bg-gray-100 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400'
                    />

                    {error && <p className='text-sm text-red-600'>{error}</p>}

                    <button
                        type='submit'
                        disabled={loading}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-3 text-center font-bold text-black transition-all duration-300 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60'>
                        {loading ? <Spinner /> : null}
                        {loading ? 'Processing...' : `Pay ${amountLabel} & Book Your Slot`}
                    </button>
                </form>
            </div>
        </div>
    );
}
