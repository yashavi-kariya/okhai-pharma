import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import Inquiry from '../models/Inquiry.js';
import { comparePassword } from '../auth.js';
import { normalizeInquiryPayload } from '../inquiryUtils.js';
import { createCaptchaChallenge, verifyCaptcha as verifyCaptchaUtil, clearCaptcha } from '../captcha.js';

const JWT_SECRET = process.env.JWT_SECRET || 'okhai-admin-secret';

export async function createInquiry(req, res) {
    try {
        const { captchaId, captchaInput, captchaVerified } = req.body;

        // If captchaVerified is true, skip verification (already done by frontend)
        // If captchaId is present but captchaVerified is false, verify on backend
        if (captchaId && !captchaVerified) {
            const result = verifyCaptchaUtil(captchaId, captchaInput);

            if (!result.valid) {
                clearCaptcha(captchaId);
                return res.status(400).json({
                    success: false,
                    message: result.error || 'CAPTCHA verification failed.'
                });
            }
        }

        const inquiry = normalizeInquiryPayload(req.body || {});
        inquiry.captchaVerification = captchaVerified ? 'verified' : 'pending';

        const saved = await Inquiry.create(inquiry);
        res.status(201).json({ success: true, inquiry: saved });
    } catch (err) {
        res.status(500).json({ message: 'Unable to save inquiry.', error: err.message });
    }
}

export function generateCaptcha(req, res) {
    try {
        const { id, captcha } = createCaptchaChallenge();
        res.json({
            id,
            captcha: captcha,
            expiresAt: 300
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to generate CAPTCHA', error: err.message });
    }
}

export function verifyCaptcha(req, res) {
    try {
        const { id, input } = req.body;

        if (!id || !input) {
            return res.status(400).json({ valid: false, error: 'Missing CAPTCHA ID or input' });
        }

        const result = verifyCaptchaUtil(id, input);

        if (!result.valid) {
            clearCaptcha(id);
            return res.status(400).json({ valid: false, error: result.error });
        }

        res.json({ valid: true });
    } catch (err) {
        res.status(500).json({ valid: false, error: err.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isValid = await comparePassword(password, admin.passwordHash);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email, name: admin.name }, JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, admin: { id: admin._id.toString(), email: admin.email, name: admin.name } });
}

export async function me(req, res) {
    const authorization = req.headers.authorization || '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
    if (!token) return res.status(401).json({ message: 'Missing token.' });
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        res.json({ admin: { id: payload.id, email: payload.email, name: payload.name } });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
    }
}

export async function logout(req, res) {
    res.json({ message: 'Logged out successfully.' });
}

export async function listInquiries(req, res) {
    try {
        const filter = {};
        const sourcePage = req.query.sourcePage;
        const productName = req.query.productName;
        const q = req.query.q;

        if (sourcePage) filter.sourcePage = sourcePage;
        if (productName) filter.productName = productName;

        // text search across several fields if q provided
        if (q) {
            const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, ''), 'i');
            filter.$or = [
                { name: regex },
                { email: regex },
                { subject: regex },
                { company: regex },
            ];
        }

        const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
        res.json({ inquiries });
    } catch (err) {
        res.status(500).json({ message: 'Unable to load inquiries.', error: err.message });
    }
}

export async function deleteInquiry(req, res) {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: 'Missing id' });
        const deleted = await Inquiry.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: 'Unable to delete inquiry.', error: err.message });
    }
}

export default { login, me, logout, createInquiry, listInquiries, deleteInquiry, generateCaptcha, verifyCaptcha };
