import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function POST(request: NextRequest) {
    const { firstName, lastName, email, phone, message } = await request.json();

    if (!firstName || !lastName || !email || !phone || !message) {
        return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 422 });
    }

    await connectToDatabase();

    await Lead.create({
        type: 'CONTACT',
        firstName,
        lastName,
        email,
        phone,
        message,
        products: [],
    });

    return NextResponse.json({ message: "Thanks for reaching out — we'll be in touch soon." });
}
