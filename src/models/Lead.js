import mongoose, { Schema } from 'mongoose';

const LeadSchema = new Schema(
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

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
