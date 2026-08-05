import Link from 'next/link';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Payment from '@/models/Payment';

export const metadata = {
    title: 'Booking Confirmed - 3A Softwares',
};

export default async function PaymentSuccessPage({ searchParams }) {
    const { orderId } = await searchParams;

    let booking = null;
    let payment = null;

    if (orderId) {
        await connectToDatabase();
        booking = await Booking.findOne({ orderId }).lean();
        payment = await Payment.findOne({ orderId }).lean();
    }

    return (
        <>
            <NavBar />
            <div className='flex justify-center items-center mt-8 w-full bg-white py-16 lg:py-24'>
                <div className='container mx-auto px-4 max-w-2xl text-center'>
                    <div className='text-6xl mb-6'>✅</div>
                    <h1 className='font-bold text-3xl md:text-4xl text-black mb-4'>Booking Confirmed!</h1>
                    <p className='text-gray-600 text-lg mb-8'>
                        Thanks for your ₹99 booking fee — we've reserved your project slot and will reach out shortly to discuss your{' '}
                        {booking?.planName || payment?.planName || 'project'} in detail.
                    </p>

                    {booking && (
                        <div className='bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-left mb-8'>
                            <dl className='space-y-2 text-gray-700'>
                                <div className='flex justify-between'>
                                    <dt className='font-semibold'>Plan</dt>
                                    <dd>{booking.planName}</dd>
                                </div>
                                <div className='flex justify-between'>
                                    <dt className='font-semibold'>Amount Paid</dt>
                                    <dd>₹{(booking.bookingAmount / 100).toFixed(2)}</dd>
                                </div>
                                <div className='flex justify-between'>
                                    <dt className='font-semibold'>Booking ID</dt>
                                    <dd className='break-all'>{String(booking._id)}</dd>
                                </div>
                                <div className='flex justify-between'>
                                    <dt className='font-semibold'>Order ID</dt>
                                    <dd className='break-all'>{booking.orderId}</dd>
                                </div>
                                {booking.paymentId && (
                                    <div className='flex justify-between'>
                                        <dt className='font-semibold'>Payment ID</dt>
                                        <dd className='break-all'>{booking.paymentId}</dd>
                                    </div>
                                )}
                                <div className='flex justify-between'>
                                    <dt className='font-semibold'>Receipt</dt>
                                    <dd className='break-all'>{booking.receipt}</dd>
                                </div>
                                <div className='flex justify-between'>
                                    <dt className='font-semibold'>Date</dt>
                                    <dd>{new Date(booking.updatedAt).toLocaleString('en-IN')}</dd>
                                </div>
                            </dl>
                        </div>
                    )}

                    {!booking && (
                        <p className='text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8'>
                            We're still confirming your payment status. If you were charged and don't hear from us within a few hours, please contact us with
                            your order ID{orderId ? ` (${orderId})` : ''}.
                        </p>
                    )}

                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <Link
                            href='/'
                            className='inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300'>
                            Go Dashboard
                        </Link>
                        {booking && (
                            <Link
                                href={`/api/payment/receipt?orderId=${encodeURIComponent(booking.orderId)}`}
                                className='inline-block border-2 border-gray-600 text-gray-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all duration-300'>
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
