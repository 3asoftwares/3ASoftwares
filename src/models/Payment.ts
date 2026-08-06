import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IPayment extends Document {
    userId: string | null;
    planId: number;
    planName: string;
    bookingAmount: number;
    fullPlanAmount: number | null;
    currency: string;
    paymentId: string | null;
    orderId: string;
    signature: string | null;
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
    paymentMethod: string | null;
    receipt: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    failureReason: string | null;
    notes: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
    {
        userId: { type: String, default: null, index: true },
        planId: { type: Number, required: true, index: true },
        planName: { type: String, required: true, trim: true },
        bookingAmount: { type: Number, required: true },
        fullPlanAmount: { type: Number, default: null },
        currency: { type: String, required: true, default: 'INR' },
        paymentId: { type: String, default: null, index: true },
        orderId: { type: String, required: true, unique: true, index: true },
        signature: { type: String, default: null },
        status: {
            type: String,
            enum: ['SUCCESS', 'FAILED', 'PENDING'],
            default: 'PENDING',
            index: true,
        },
        paymentMethod: { type: String, default: null },
        receipt: { type: String, required: true, unique: true, index: true },
        customerName: { type: String, required: true, trim: true },
        customerEmail: { type: String, required: true, trim: true, lowercase: true, index: true },
        customerPhone: { type: String, required: true, trim: true },
        failureReason: { type: String, default: null },
        notes: { type: Schema.Types.Mixed, default: {} },
    },
    { timestamps: true }
);

export default (mongoose.models.Payment as Model<IPayment>) || mongoose.model<IPayment>('Payment', PaymentSchema);
