import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IBooking extends Document {
    userId: string | null;
    planId: number;
    planName: string;
    status: 'BOOKED';
    bookingAmount: number;
    fullPlanAmount: number | null;
    remainingAmount: number | null;
    currency: string;
    paymentId: string;
    orderId: string;
    receipt: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        userId: { type: String, default: null, index: true },
        planId: { type: Number, required: true, index: true },
        planName: { type: String, required: true, trim: true },
        status: {
            type: String,
            enum: ['BOOKED'],
            default: 'BOOKED',
            required: true,
        },
        bookingAmount: { type: Number, required: true },
        fullPlanAmount: { type: Number, default: null },
        remainingAmount: { type: Number, default: null },
        currency: { type: String, required: true, default: 'INR' },
        paymentId: { type: String, required: true, unique: true, index: true },
        orderId: { type: String, required: true, unique: true, index: true },
        receipt: { type: String, required: true, unique: true, index: true },
        customerName: { type: String, required: true, trim: true },
        customerEmail: { type: String, required: true, trim: true, lowercase: true },
        customerPhone: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export default (mongoose.models.Booking as Model<IBooking>) || mongoose.model<IBooking>('Booking', BookingSchema);
