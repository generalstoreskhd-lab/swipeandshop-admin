import { hashPassword, verifyPassword, encryptData, decryptData } from '../../src/authentication/authUtils';

describe('Authentication Utilities', () => {
    const plainPassword = 'mySuperSecretPassword123!';
    const secretKey = 'test-secret-key';
    const plainData = 'sensitive user information';

    describe('bcrypt Password Hashing', () => {
        it('should securely hash a password', () => {
            const hash = hashPassword(plainPassword);
            expect(hash).toBeDefined();
            expect(hash).not.toEqual(plainPassword);
        });

        it('should correctly verify a password against its hash', () => {
            const hash = hashPassword(plainPassword);
            const isValid = verifyPassword(plainPassword, hash);
            expect(isValid).toBe(true);
        });

        it('should reject an incorrect password', () => {
            const hash = hashPassword(plainPassword);
            const isValid = verifyPassword('wrongpassword', hash);
            expect(isValid).toBe(false);
        });
    });

    describe('CryptoJS Encryption & Decryption', () => {
        it('should encrypt data to a ciphertext', () => {
            const ciphertext = encryptData(plainData, secretKey);
            expect(ciphertext).toBeDefined();
            expect(ciphertext).not.toEqual(plainData);
        });

        it('should correctly decrypt the ciphertext back to original data', () => {
            const ciphertext = encryptData(plainData, secretKey);
            const decrypted = decryptData(ciphertext, secretKey);
            expect(decrypted).toEqual(plainData);
        });

        it('should return empty or throw when decrypting with wrong key', () => {
            const ciphertext = encryptData(plainData, secretKey);
            const decrypted = decryptData(ciphertext, 'wrong-key');
            expect(decrypted).not.toEqual(plainData);
        });
    });
});
