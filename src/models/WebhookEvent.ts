import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IWebhookEvent extends Document {
    provider: string;
    eventId: string;
    eventType: string;
    orderId: string | null;
    paymentId: string | null;
    payload: unknown;
    createdAt: Date;
    updatedAt: Date;
}

const WebhookEventSchema = new Schema<IWebhookEvent>(
    {
        provider: { type: String, required: true, default: 'RAZORPAY' },
        eventId: { type: String, required: true, unique: true, index: true },
        eventType: { type: String, required: true },
        orderId: { type: String, default: null, index: true },
        paymentId: { type: String, default: null, index: true },
        payload: { type: Schema.Types.Mixed, required: true },
    },
    { timestamps: true }
);

export default (mongoose.models.WebhookEvent as Model<IWebhookEvent>) || mongoose.model<IWebhookEvent>('WebhookEvent', WebhookEventSchema);
