import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser.js';
import { comparePassword } from '../auth.js';

const envPath = fileURLToPath(new URL('../.env', import.meta.url));
dotenv.config({ path: envPath });

async function run() {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    const admin = await AdminUser.findOne({ email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@okhai.com' }).lean();
    if (!admin) {
        console.log('No admin user found');
        process.exit(0);
    }
    const ok = await comparePassword('admin123456', admin.passwordHash);
    console.log('Default password matches stored hash:', ok);
    await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
