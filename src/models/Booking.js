import mongoose, { Schema } from 'mongoose';

const BookingSchema = new Schema(
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

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
