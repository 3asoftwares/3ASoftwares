import Link from 'next/link';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer';
import { connectToDatabase } from '@/lib/mongodb';
import Payment from '@/models/Payment';

export const metadata = {
    title: 'Payment Failed - 3A Softwares',
};

export default async function PaymentFailedPage({ searchParams }) {
    const { orderId, reason } = await searchParams;
    let payment = null;

    if (orderId) {
        await connectToDatabase();
        payment = await Payment.findOne({ orderId }).lean();
    }

    const failureReason = reason || payment?.failureReason || 'Payment could not be completed.';

    return (
        <>
            <NavBar />
            <div className='flex w-full items-center justify-center bg-white py-16 lg:py-24 mt-8'>
                <div className='container mx-auto max-w-2xl px-4 text-center'>
                    <div className='mb-6 text-6xl'>⚠️</div>
                    <h1 className='mb-4 text-3xl font-bold text-black md:text-4xl'>Payment Did Not Complete</h1>
                    <p className='mb-8 text-lg text-gray-600'>
                        {payment
                            ? `Your ₹99 booking payment for ${payment.planName} was not completed.`
                            : 'Your booking payment was not completed.'}{' '}
                        No amount has been reserved. Please retry.
                    </p>

                    <p className='mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700'>{failureReason}</p>

                    <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                        <Link href='/#products' className='inline-block rounded-lg bg-gray-700 px-8 py-3 font-bold text-white hover:bg-gray-900'>
                            Retry Payment
                        </Link>
                        <Link
                            href='/'
                            className='inline-block rounded-lg border-2 border-gray-600 px-8 py-3 font-bold text-gray-700 hover:bg-gray-50'>
                            Back
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
