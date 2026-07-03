import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminController.login);
router.get('/me', adminController.me);
router.post('/logout', adminController.logout);

router.get('/captcha/generate', adminController.generateCaptcha);
router.post('/captcha/verify', adminController.verifyCaptcha);

router.post('/inquiries', adminController.createInquiry);
router.get('/inquiries', adminController.listInquiries);
router.delete('/inquiries/:id', adminController.deleteInquiry);

export default router;
