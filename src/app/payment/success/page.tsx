import Link from 'next/link';
import type { Metadata } from 'next';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Payment from '@/models/Payment';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
    title: `Booking Confirmed - ${COMPANY.name}`,
};

interface PaymentSuccessPageProps {
    searchParams: Promise<{ orderId?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
    const { orderId } = await searchParams;

    let booking = null;
    let payment = null;

    if (orderId) {
        await connectToDatabase();
        booking = await Booking.findOne({ orderId }).lean();
        payment = await Payment.findOne({ orderId }).lean();
    }

    const paidAmountPaise = booking?.bookingAmount || payment?.bookingAmount || 0;

    return (
        <>
            <NavBar />
            <div className='bg-canvas relative overflow-hidden pt-20 pb-16'>
                <div className='section-glow' />
                <div className='relative mx-auto max-w-xl px-6 text-center'>
                    <div className='mb-4 text-4xl'>✅</div>
                    <h1 className='text-fg font-display text-2xl font-bold sm:text-3xl'>Booking Confirmed!</h1>
                    <p className='text-fg-muted mt-3 text-sm'>
                        Thanks for your booking payment of ₹{(paidAmountPaise / 100).toFixed(2)} — we've reserved your project slot and will reach out
                        shortly to discuss your {booking?.planName || payment?.planName || 'project'} in detail.
                    </p>

                    {booking && (
                        <div className='glass-panel mt-6 rounded-xl p-5 text-left'>
                            <dl className='text-fg-muted space-y-1.5 text-sm'>
                                <div className='flex justify-between'>
                                    <dt className='text-fg font-semibold'>Plan</dt>
                                    <dd>{booking.planName}</dd>
                                </div>
                                <div className='flex justify-between'>
                                    <dt className='text-fg font-semibold'>Amount Paid</dt>
                                    <dd>₹{(booking.bookingAmount / 100).toFixed(2)}</dd>
                                </div>
                                <div className='flex justify-between'>
                                    <dt className='text-fg font-semibold'>Booking ID</dt>
                                    <dd className='break-all'>{String(booking._id)}</dd>
                                </div>
                                <div className='flex justify-between'>
                                    <dt className='text-fg font-semibold'>Order ID</dt>
                                    <dd className='break-all'>{booking.orderId}</dd>
                                </div>
                                {booking.paymentId && (
                                    <div className='flex justify-between'>
                                        <dt className='text-fg font-semibold'>Payment ID</dt>
                                        <dd className='break-all'>{booking.paymentId}</dd>
                                    </div>
                                )}
                                <div className='flex justify-between'>
                                    <dt className='text-fg font-semibold'>Receipt</dt>
                                    <dd className='break-all'>{booking.receipt}</dd>
                                </div>
                                <div className='flex justify-between'>
                                    <dt className='text-fg font-semibold'>Date</dt>
                                    <dd>{new Date(booking.updatedAt).toLocaleString('en-IN')}</dd>
                                </div>
                            </dl>
                        </div>
                    )}

                    {!booking && (
                        <p className='mt-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-700 dark:text-yellow-300'>
                            We're still confirming your payment status. If you were charged and don't hear from us within a few hours, please contact us with
                            your order ID{orderId ? ` (${orderId})` : ''}.
                        </p>
                    )}

                    <div className='mt-6 flex flex-col justify-center gap-3 sm:flex-row'>
                        <Link
                            href='/'
                            className='inline-block rounded-lg bg-gradient-to-r from-brand-500 to-accent-400 px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105'>
                            Back to Home
                        </Link>
                        {booking && (
                            <Link
                                href={`/api/payment/receipt?orderId=${encodeURIComponent(booking.orderId)}`}
                                className='border-hairline text-fg inline-block rounded-lg border px-6 py-2.5 text-sm font-bold transition-colors hover:bg-slate-900/5 dark:hover:bg-white/5'>
                                Download Receipt
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
