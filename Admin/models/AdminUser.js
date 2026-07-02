import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        name: { type: String, default: 'Administrator' },
    },
    { timestamps: true }
);

const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);

export default AdminUser;
