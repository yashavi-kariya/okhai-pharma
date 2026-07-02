import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'node:url';
import { comparePassword, createPasswordHash } from './auth.js';
import { normalizeInquiryPayload } from './inquiryUtils.js';
import AdminUser from './models/AdminUser.js';
import Inquiry from './models/Inquiry.js';
import adminRoutes from './routes/adminRoutes.js';

const envPath = fileURLToPath(new URL('./.env', import.meta.url));
dotenv.config({ path: envPath });
const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017/okhai-pharma';
const JWT_SECRET = process.env.JWT_SECRET || 'okhai-admin-secret';
const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || 'admin@okhai.com';
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123456';

let fallbackAdmin = null;
let usingFallbackStore = false;

async function ensureDefaultAdmin() {
    if (usingFallbackStore) {
        if (!fallbackAdmin) {
            fallbackAdmin = {
                _id: 'fallback-admin',
                email: DEFAULT_ADMIN_EMAIL,
                name: 'Administrator',
                passwordHash: await createPasswordHash(DEFAULT_ADMIN_PASSWORD),
            };
        }

        return fallbackAdmin;
    }

    const existingAdmin = await AdminUser.findOne({ email: DEFAULT_ADMIN_EMAIL });
    if (existingAdmin) {
        return existingAdmin;
    }

    return AdminUser.create({
        email: DEFAULT_ADMIN_EMAIL,
        name: 'Administrator',
        passwordHash: await createPasswordHash(DEFAULT_ADMIN_PASSWORD),
    });
}

async function connectDatabase() {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            retryWrites: true,
            w: 'majority',
        });
        console.log('MongoDB Atlas connected successfully');
        usingFallbackStore = false;
    } catch (error) {
        console.warn('MongoDB connection failed, using fallback auth store:', error.message);
        usingFallbackStore = true;
    }
}

app.get('/api/admin/health', (req, res) => {
    res.json({ status: 'ok', mongodb: !usingFallbackStore });
});

// Mount admin routes (login, me, inquiries, etc.)
app.use('/api/admin', adminRoutes);

app.get('/api/admin/me', async (req, res) => {
    const authorization = req.headers.authorization || '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';

    if (!token) {
        return res.status(401).json({ message: 'Missing token.' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        res.json({
            admin: {
                id: payload.id,
                email: payload.email,
                name: payload.name,
            },
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
});

app.post('/api/admin/logout', (req, res) => {
    res.json({ message: 'Logged out successfully.' });
});

app.post('/api/admin/inquiries', async (req, res) => {
    try {
        const inquiry = normalizeInquiryPayload(req.body || {});
        const savedInquiry = await Inquiry.create(inquiry);
        res.status(201).json({ success: true, inquiry: savedInquiry });
    } catch (error) {
        res.status(500).json({ message: 'Unable to save inquiry.', error: error.message });
    }
});

app.get('/api/admin/inquiries', async (req, res) => {
    try {
        const filter = {};
        const sourcePage = req.query.sourcePage;
        if (sourcePage) filter.sourcePage = sourcePage;

        const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
        res.json({ inquiries });
    } catch (error) {
        res.status(500).json({ message: 'Unable to load inquiries.', error: error.message });
    }
});

async function startServer() {
    await connectDatabase();
    await ensureDefaultAdmin();

    app.listen(PORT, () => {
        console.log(`Admin backend running on http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error('Failed to start admin backend:', error);
    process.exit(1);
});
