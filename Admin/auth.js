import bcrypt from 'bcryptjs';

export async function createPasswordHash(password) {
    return bcrypt.hash(password, 10);
}

export async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}
