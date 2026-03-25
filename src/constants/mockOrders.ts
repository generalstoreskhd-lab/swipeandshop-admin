import { Order } from "../types/models";

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-001',
        clientId: 'user_123',
        type: 'DELIVERY',
        items: [
            { productId: '1', name: 'Fresh Whole Milk', price: 45, quantity: 2 },
            { productId: '2', name: 'Chocolate Chip Cookies', price: 120, quantity: 1 }
        ],
        totalAmount: 210,
        status: 'PENDING',
        paymentMethod: { id: 'p1', type: 'UPI', upiId: 'user@okaxis' },
        paymentStatus: 'PENDING',
        shippingAddress: '123 Coconut Grove, Kochi, Kerala - 682001',
        orderDate: Date.now() - 3600000 * 2, // 2 hours ago
    },
    {
        id: 'ORD-002',
        clientId: 'user_456',
        type: 'DELIVERY',
        items: [
            { productId: '3', name: 'Basmati Rice', price: 850, quantity: 1 },
            { productId: '6', name: 'Organic Red Apples', price: 180, quantity: 2 }
        ],
        totalAmount: 1210,
        status: 'PROCESSING',
        paymentMethod: { id: 'p2', type: 'COD' },
        paymentStatus: 'PENDING',
        shippingAddress: '456 Palm Avenue, Trivandrum, Kerala - 695001',
        orderDate: Date.now() - 3600000 * 5, // 5 hours ago
    },
    {
        id: 'ORD-003',
        clientId: 'user_789',
        type: 'COLLECTION',
        items: [
            { productId: '4', name: 'Laundry Detergent', price: 450, quantity: 1 }
        ],
        totalAmount: 450,
        status: 'DELIVERED',
        paymentMethod: { id: 'p3', type: 'UPI', upiId: 'user789@ybl' },
        paymentStatus: 'PAID',
        orderDate: Date.now() - 86400000, // 1 day ago
    }
];
