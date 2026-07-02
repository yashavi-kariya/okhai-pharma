import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, default: 'General Query' },
        message: { type: String, default: '' },
        sourcePage: { type: String, enum: ['contact', 'product'], default: 'contact' },
        productName: { type: String, default: '' },
    },
    { timestamps: true }
);

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
