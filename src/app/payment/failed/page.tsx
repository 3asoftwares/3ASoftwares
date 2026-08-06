import Link from 'next/link';
import type { Metadata } from 'next';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer';
import { connectToDatabase } from '@/lib/mongodb';
import Payment from '@/models/Payment';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
    title: `Payment Failed - ${COMPANY.name}`,
};

interface PaymentFailedPageProps {
    searchParams: Promise<{ orderId?: string; reason?: string }>;
}

export default async function PaymentFailedPage({ searchParams }: PaymentFailedPageProps) {
    const { orderId, reason } = await searchParams;
    let payment = null;

    if (orderId) {
        await connectToDatabase();
        payment = await Payment.findOne({ orderId }).lean();
    }

    const failureReason = reason || payment?.failureReason || 'Payment could not be completed.';
    const attemptedAmount = payment?.bookingAmount ? `₹${(payment.bookingAmount / 100).toFixed(2)}` : 'the booking amount';

    return (
        <>
            <NavBar />
            <div className='bg-canvas relative overflow-hidden pt-20 pb-16'>
                <div className='section-glow' />
                <div className='relative mx-auto max-w-xl px-6 text-center'>
                    <div className='mb-4 text-4xl'>⚠️</div>
                    <h1 className='text-fg font-display text-2xl font-bold sm:text-3xl'>Payment Did Not Complete</h1>
                    <p className='text-fg-muted mt-3 text-sm'>
                        {payment
                            ? `Your booking payment of ${attemptedAmount} for ${payment.planName} was not completed.`
                            : 'Your booking payment was not completed.'}{' '}
                        No amount has been reserved. Please retry.
                    </p>

                    <p className='mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300'>{failureReason}</p>

                    <div className='mt-6 flex flex-col justify-center gap-3 sm:flex-row'>
                        <Link
                            href='/#products'
                            className='inline-block rounded-lg bg-gradient-to-r from-brand-500 to-accent-400 px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105'>
                            Retry Payment
                        </Link>
                        <Link
                            href='/'
                            className='border-hairline text-fg inline-block rounded-lg border px-6 py-2.5 text-sm font-bold transition-colors hover:bg-slate-900/5 dark:hover:bg-white/5'>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
