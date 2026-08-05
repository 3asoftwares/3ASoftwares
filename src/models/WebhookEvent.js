import mongoose, { Schema } from 'mongoose';

const WebhookEventSchema = new Schema(
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

export default mongoose.models.WebhookEvent || mongoose.model('WebhookEvent', WebhookEventSchema);
