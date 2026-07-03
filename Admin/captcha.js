import crypto from 'crypto';

const CAPTCHA_LENGTH = 6;
const CAPTCHA_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

const captchaStore = new Map();

export function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let text = '';
  for (let i = 0; i < CAPTCHA_LENGTH; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

export function createCaptchaChallenge() {
  const captcha = generateCaptcha();
  const id = crypto.randomBytes(16).toString('hex');
  
  captchaStore.set(id, {
    captcha,
    expiresAt: Date.now() + CAPTCHA_EXPIRY_MS,
    used: false
  });
  
  return { id, captcha };
}

export function verifyCaptcha(id, input) {
  const record = captchaStore.get(id);
  
  if (!record) {
    return { valid: false, error: 'CAPTCHA expired or not found' };
  }
  
  if (record.used) {
    captchaStore.delete(id);
    return { valid: false, error: 'CAPTCHA already used' };
  }
  
  if (Date.now() > record.expiresAt) {
    captchaStore.delete(id);
    return { valid: false, error: 'CAPTCHA expired' };
  }
  
  const isMatch = record.captcha.toUpperCase() === input.toUpperCase();
  
  if (isMatch) {
    record.used = true;
  }
  
  return { valid: isMatch };
}

export function clearCaptcha(id) {
  captchaStore.delete(id);
}
