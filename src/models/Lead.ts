import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface ILead extends Document {
    type: 'CONTACT' | 'DEMO';
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    products: string[];
    createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
    {
        type: {
            type: String,
            enum: ['CONTACT', 'DEMO'],
            required: true,
        },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        products: { type: [String], default: [] },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export default (mongoose.models.Lead as Model<ILead>) || mongoose.model<ILead>('Lead', LeadSchema);
