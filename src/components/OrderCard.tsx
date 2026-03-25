import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Order } from '../types/models';
import { Ionicons } from '@expo/vector-icons';

interface OrderCardProps {
    order: Order;
    onStatusUpdate?: (orderId: string, newStatus: Order['status']) => void;
    onGenerateInvoice?: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusUpdate, onGenerateInvoice }) => {
    const orderDate = new Date(order.orderDate).toLocaleString([], { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    const getOrderStatusConfig = (status: string) => {
        switch (status) {
            case 'PENDING': return { text: 'PENDING', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: 'time-outline' };
            case 'PROCESSING': return { text: 'PROCESSING', color: 'text-sky-600 bg-sky-50 border-sky-100', icon: 'sync-outline' };
            case 'SHIPPED': return { text: 'SHIPPED', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: 'airplane-outline' };
            case 'DELIVERED': return { text: 'DELIVERED', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: 'checkmark-circle-outline' };
            case 'CANCELLED': return { text: 'CANCELLED', color: 'text-red-600 bg-red-50 border-red-100', icon: 'close-circle-outline' };
            default: return { text: status, color: 'text-slate-600 bg-slate-50 border-slate-100', icon: 'help-circle-outline' };
        }
    };

    const getPaymentStatusConfig = (status: string) => {
        switch (status) {
            case 'PAID': return { text: 'PAID', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
            case 'PENDING': return { text: 'UNPAID', color: 'text-amber-600 bg-amber-50 border-amber-100' };
            case 'FAILED': return { text: 'FAILED', color: 'text-red-600 bg-red-50 border-red-100' };
            case 'REFUNDED': return { text: 'REFUNDED', color: 'text-slate-600 bg-slate-50 border-slate-100' };
            default: return { text: status, color: 'text-slate-500 bg-slate-50 border-slate-100' };
        }
    };

    const orderStatus = getOrderStatusConfig(order.status);
    const paymentStatus = getPaymentStatusConfig(order.paymentStatus);

    return (
        <View className="bg-slate-50 rounded-[40px] p-6 mb-6 border border-slate-200 shadow-sm shadow-slate-100">
            {/* Header: Order ID & Date */}
            <View className="flex-row justify-between items-start mb-6">
                <View>
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Order Transaction</Text>
                    <Text className="text-slate-950 font-outfit font-bold text-xl">#{order.id}</Text>
                    <Text className="text-slate-400 text-[10px] font-inter mt-1">{orderDate}</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => onGenerateInvoice?.(order)}
                    className="bg-white px-3 py-2 rounded-2xl border border-slate-100 shadow-sm flex-row items-center"
                >
                    <Ionicons name="receipt-outline" size={16} color="#0ea5e9" />
                    <Text className="text-[10px] font-bold text-sky-600 ml-1.5 uppercase tracking-tighter">Invoice</Text>
                </TouchableOpacity>
            </View>

            {/* Status Section - Two Distinct Units */}
            <View className="flex-row gap-x-3 mb-6">
                <View className="flex-1">
                    <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Order Status</Text>
                    <View className={`flex-row items-center px-3 py-2.5 rounded-2xl border ${orderStatus.color} shadow-sm shadow-slate-200/50`}>
                        <Ionicons name={orderStatus.icon as any} size={14} color="currentColor" />
                        <Text className="text-[10px] font-bold ml-1.5">{orderStatus.text}</Text>
                    </View>
                </View>
                <View className="flex-1">
                    <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Payment Status</Text>
                    <View className={`flex-row items-center justify-center px-3 py-2.5 rounded-2xl border ${paymentStatus.color} shadow-sm shadow-slate-200/50`}>
                        <Text className="text-[10px] font-bold">{paymentStatus.text}</Text>
                    </View>
                </View>
            </View>

            {/* Customer & Items Split */}
            <View className="bg-white rounded-[32px] p-5 mb-6 border border-slate-200 shadow-sm shadow-slate-100">
               <View className="flex-row items-center mb-4 border-b border-slate-100 pb-4">
                    <View className="w-10 h-10 bg-sky-50 rounded-full items-center justify-center">
                        <Ionicons name="person" size={18} color="#0ea5e9" />
                    </View>
                    <View className="ml-3 flex-1">
                        <Text className="text-[9px] font-bold text-slate-400 uppercase">Customer Info</Text>
                        <Text className="text-slate-900 font-bold text-sm" numberOfLines={1}>{order.clientId}</Text>
                    </View>
               </View>

                <View>
                    <Text className="text-[9px] font-bold text-slate-400 uppercase mb-3">Items Summary</Text>
                    {order.items.map((item, index) => (
                        <View key={index} className="flex-row justify-between items-center mb-2">
                            <View className="flex-row items-center flex-1">
                                <View className="w-5 h-5 bg-slate-100 rounded-md items-center justify-center mr-2">
                                    <Text className="text-[9px] font-bold text-slate-600">{item.quantity}</Text>
                                </View>
                                <Text className="text-slate-700 font-inter text-sm" numberOfLines={1}>{item.name}</Text>
                            </View>
                            <Text className="text-slate-950 font-bold text-sm ml-2">₹{item.price * item.quantity}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Address and Stats */}
            <View className="flex-row items-start gap-x-4 mb-6 px-1">
                <View className="flex-1">
                    <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Delivery Address</Text>
                    <View className="flex-row">
                        <Ionicons name="location-outline" size={14} color="#94a3b8" style={{ marginTop: 2 }} />
                        <Text className="text-slate-500 text-xs ml-1 font-inter leading-4" numberOfLines={2}>
                            {order.shippingAddress || 'Store Collection'}
                        </Text>
                    </View>
                </View>
                <View className="items-end">
                    <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Method</Text>
                    <View className="flex-row items-center bg-white border border-slate-100 px-3 py-1.5 rounded-xl shadow-sm">
                         <Ionicons name={order.paymentMethod.type === 'UPI' ? 'phone-portrait-outline' : 'cash-outline'} size={12} color="#64748b" />
                         <Text className="text-slate-600 font-bold text-[10px] ml-1.5">{order.paymentMethod.type}</Text>
                    </View>
                </View>
            </View>

            {/* Footer: Amount & View Action */}
            <View className="flex-row justify-between items-center pt-6 border-t border-slate-200">
                <View>
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grand Total</Text>
                    <Text className="text-sky-500 font-outfit font-bold text-3xl">₹{order.totalAmount}</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => onStatusUpdate?.(order.id || '', order.status)}
                    className="bg-sky-500 px-6 py-4 rounded-2xl flex-row items-center shadow-lg shadow-sky-200"
                >
                    <Text className="text-white font-bold text-sm mr-2">Update Status</Text>
                    <Ionicons name="options-outline" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OrderCard;
