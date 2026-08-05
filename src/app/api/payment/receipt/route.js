import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET(request) {
    const orderId = request.nextUrl.searchParams.get('orderId');

    if (!orderId) {
        return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    await connectToDatabase();
    const booking = await Booking.findOne({ orderId }).lean();

    if (!booking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const content = [
        '3A Softwares Booking Receipt',
        '----------------------------',
        `Receipt: ${booking.receipt}`,
        `Booking ID: ${String(booking._id)}`,
        `Order ID: ${booking.orderId}`,
        `Payment ID: ${booking.paymentId}`,
        `Plan: ${booking.planName}`,
        `Amount Paid: INR ${(booking.bookingAmount / 100).toFixed(2)}`,
        `Date: ${new Date(booking.updatedAt).toLocaleString('en-IN')}`,
        `Customer: ${booking.customerName} (${booking.customerEmail})`,
    ].join('\n');

    return new NextResponse(content, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Disposition': `attachment; filename="${booking.receipt}.txt"`,
        },
    });
}
