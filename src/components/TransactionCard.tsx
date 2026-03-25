import React from 'react';
import { View, Text } from 'react-native';
import { Transaction, TransactionStatus } from '../types/models';
import { Ionicons } from '@expo/vector-icons';

interface TransactionCardProps {
    transaction: Transaction;
}

const getStatusConfig = (status: TransactionStatus) => {
    switch (status) {
        case 'COMPLETED':
            return { color: 'bg-emerald-50 border-emerald-100 text-emerald-600', icon: 'checkmark-circle', text: 'Completed' };
        case 'PENDING':
            return { color: 'bg-amber-50 border-amber-100 text-amber-600', icon: 'time', text: 'Pending' };
        case 'FAILED':
            return { color: 'bg-red-50 border-red-100 text-red-500', icon: 'close-circle', text: 'Failed' };
        case 'REFUNDED':
            return { color: 'bg-slate-100 border-slate-200 text-slate-500', icon: 'refresh', text: 'Refunded' };
        default:
            return { color: 'bg-slate-50 border-slate-100 text-slate-400', icon: 'help-circle', text: status };
    }
};

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
    const status = getStatusConfig(transaction.status);
    const date = new Date(transaction.createdAt).toLocaleString([], { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    return (
        <View className="bg-slate-50 rounded-[32px] p-5 mb-4 border border-slate-200 shadow-sm shadow-slate-100">
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center">
                    <View className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <Ionicons 
                            name={transaction.paymentMethod.type === 'UPI' ? 'phone-portrait-outline' : 'cash-outline'} 
                            size={20} 
                            color="#64748b" 
                        />
                    </View>
                    <View className="ml-3">
                        <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Reference ID</Text>
                        <Text className="text-slate-950 font-outfit font-bold text-sm">#{transaction.id}</Text>
                    </View>
                </View>
                <View className={`flex-row items-center px-3 py-1.5 rounded-full border ${status.color}`}>
                    <Ionicons name={status.icon as any} size={12} color="currentColor" />
                    <Text className="text-[10px] font-bold ml-1.5">{status.text}</Text>
                </View>
            </View>

            <View className="bg-white rounded-3xl p-4 mb-4 border border-slate-100 shadow-sm shadow-slate-200/50">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-slate-500 font-inter text-xs">Order ID</Text>
                    <Text className="text-slate-900 font-bold text-xs">#{transaction.orderId}</Text>
                </View>
                {transaction.referenceNumber && (
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-slate-500 font-inter text-xs">UPI Ref</Text>
                        <Text className="text-sky-600 font-bold text-xs">{transaction.referenceNumber}</Text>
                    </View>
                )}
                <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 font-inter text-xs">Transaction Date</Text>
                    <Text className="text-slate-900 font-bold text-xs">{date}</Text>
                </View>
            </View>

            <View className="flex-row justify-between items-center">
                <View>
                    <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Amount Paid</Text>
                    <Text className="text-slate-950 font-outfit font-bold text-2xl">₹{transaction.amount}</Text>
                </View>
                <View className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                    <Text className="text-slate-600 font-bold text-[10px]">{transaction.paymentMethod.type}</Text>
                </View>
            </View>
        </View>
    );
};

export default TransactionCard;
