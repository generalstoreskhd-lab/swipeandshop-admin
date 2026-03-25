import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

const SALT_ROUNDS = 10;

/**
 * Hashes a given password string using bcrypt.
 */
export const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
};

/**
 * Verifies a password against a hash using bcrypt.
 */
export const verifyPassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
};

/**
 * Encrypts data using AES encryption and a secret key.
 */
export const encryptData = (data: string, secretKey: string): string => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

/**
 * Decrypts AES encrypted data using a secret key.
 */
export const decryptData = (encryptedData: string, secretKey: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
