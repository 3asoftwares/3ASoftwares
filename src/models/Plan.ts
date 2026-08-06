import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IPlan extends Document {
    id: number;
    order: number;
    title: string;
    price: string;
    bookingAmountRupees: number;
    icon: string;
    bestFor: string;
    features: string[];
    featured: boolean;
}

const PlanSchema = new Schema<IPlan>(
    {
        id: { type: Number, required: true, unique: true, index: true },
        order: { type: Number, required: true, default: 0 },
        title: { type: String, required: true, trim: true },
        price: { type: String, required: true },
        bookingAmountRupees: { type: Number, required: true },
        icon: { type: String, required: true },
        bestFor: { type: String, required: true },
        features: { type: [String], default: [] },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default (mongoose.models.Plan as Model<IPlan>) || mongoose.model<IPlan>('Plan', PlanSchema);
