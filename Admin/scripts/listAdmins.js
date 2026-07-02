import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import AdminUser from '../models/AdminUser.js';

const envPath = fileURLToPath(new URL('../.env', import.meta.url));
dotenv.config({ path: envPath });

async function run() {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        console.error('MONGO_URI not set in .env');
        process.exit(1);
    }

    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    const users = await AdminUser.find({}).lean();
    console.log('AdminUser documents:');
    console.log(JSON.stringify(users, null, 2));
    await mongoose.disconnect();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
