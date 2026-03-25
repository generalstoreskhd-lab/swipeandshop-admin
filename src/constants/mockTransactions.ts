import { Transaction } from '../types/models';

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 'TXN-001',
        orderId: 'ORD-001',
        clientId: 'user_123',
        amount: 210,
        paymentMethod: {
            id: 'PM-001',
            type: 'UPI',
            upiId: 'user123@upi'
        },
        status: 'COMPLETED',
        referenceNumber: 'UPI9876543210',
        createdAt: Date.now() - 3600000 // 1 hour ago
    },
    {
        id: 'TXN-002',
        orderId: 'ORD-002',
        clientId: 'user_456',
        amount: 450,
        paymentMethod: {
            id: 'PM-002',
            type: 'COD'
        },
        status: 'PENDING',
        createdAt: Date.now() - 86400000 // 1 day ago
    },
    {
        id: 'TXN-003',
        orderId: 'ORD-003',
        clientId: 'user_789',
        amount: 1200,
        paymentMethod: {
            id: 'PM-003',
            type: 'UPI',
            upiId: 'user789@upi'
        },
        status: 'COMPLETED',
        referenceNumber: 'UPI1234567890',
        createdAt: Date.now() - (86400000 * 3) // 3 days ago
    },
    {
        id: 'TXN-004',
        orderId: 'ORD-004',
        clientId: 'user_123',
        amount: 750,
        paymentMethod: {
            id: 'PM-004',
            type: 'UPI',
            upiId: 'user123@upi'
        },
        status: 'FAILED',
        createdAt: Date.now() - (86400000 * 10) // 10 days ago
    }
];
