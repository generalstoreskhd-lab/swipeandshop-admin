export interface BasePayment {
    id: string;
    type: 'UPI' | 'COD';
    isDefault?: boolean;
}

export interface UPIPayment extends BasePayment {
    type: 'UPI';
    upiId: string;
}

export interface CODPayment extends BasePayment {
    type: 'COD';
    instructions?: string;
}

export type PaymentMethod = UPIPayment | CODPayment;

export interface Category {
    id: string;
    name: string;
    icon: string; // Ionicons name
}

export interface Product {
    id?: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    discount?: number;
    categoryId: string;
    images?: string[];
    isAvailable: boolean;
    createdAt?: Date | number;
    updatedAt?: Date | number;
}

export interface Inventory {
    id?: string;
    productId: string;
    quantityAvailable: number;
    lowStockThreshold: number;
    sku?: string;
    lastRestocked?: Date | number;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type OrderType = 'DELIVERY' | 'COLLECTION';

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id?: string;
    clientId: string;
    type: OrderType;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
    shippingAddress?: string; // Optional since it might be a COLLECTION order
    orderDate: Date | number;
    deliveryDate?: Date | number;
}

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface Transaction {
    id?: string;
    orderId: string;
    clientId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    status: TransactionStatus;
    referenceNumber?: string; // For UPI/bank references
    createdAt: Date | number;
    updatedAt?: Date | number;
}

export interface Invoice {
    id?: string;
    orderId: string;
    transactionId?: string; // Might be unpaid when invoice generated
    clientId: string;
    amount: number;
    billingAddress?: string;
    pdfUrl?: string; // Link to the generated invoice file
    issuedAt: Date | number;
    dueDate?: Date | number;
    status: 'UNPAID' | 'PAID' | 'OVERDUE' | 'CANCELLED';
}
