import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrdersScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-8">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-slate-900 tracking-tight">Recent Orders</Text>
          <Text className="text-slate-500 mt-2 text-lg">
            Monitor and manage your business sales.
          </Text>
        </View>
        
        <View className="flex-1 items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8">
          <View className="bg-slate-100 p-4 rounded-full mb-4">
             <Ionicons name="cart-outline" size={40} color="#94a3b8" />
          </View>
          <Text className="text-xl font-semibold text-slate-900">No Orders Yet</Text>
          <Text className="text-slate-500 mt-2 text-center text-base">
            Once you receive orders, they will appear here in chronological order.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;
