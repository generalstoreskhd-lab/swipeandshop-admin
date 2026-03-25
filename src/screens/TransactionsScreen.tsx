import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_TRANSACTIONS } from '../constants/mockTransactions';
import TransactionCard from '../components/TransactionCard';
import { Transaction } from '../types/models';

type TimeSegment = 'Daily' | 'Weekly' | 'Monthly';

const TransactionsScreen = () => {
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [segment, setSegment] = useState<TimeSegment>('Daily');

  const filteredTransactions = useMemo(() => {
    const now = Date.now();
    const dayMs = 86400000;
    
    return transactions.filter(t => {
        const timeDiff = now - (t.createdAt as number);
        if (segment === 'Daily') return timeDiff <= dayMs;
        if (segment === 'Weekly') return timeDiff <= dayMs * 7;
        if (segment === 'Monthly') return timeDiff <= dayMs * 30;
        return true;
    }).sort((a, b) => (b.createdAt as number) - (a.createdAt as number));
  }, [segment, transactions]);

  const stats = useMemo(() => {
    const total = filteredTransactions
        .filter(t => t.status === 'COMPLETED')
        .reduce((acc, curr) => acc + curr.amount, 0);
    const count = filteredTransactions.length;
    const successRate = count > 0 
        ? Math.round((filteredTransactions.filter(t => t.status === 'COMPLETED').length / count) * 100) 
        : 0;
    return { total, count, successRate };
  }, [filteredTransactions]);

  const renderHeader = () => (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-3xl font-outfit font-bold text-slate-950 tracking-tight">Finances</Text>
          <Text className="text-slate-500 font-inter text-base mt-1">Monitor your business performance</Text>
        </View>
        <TouchableOpacity className="bg-slate-100 p-3 rounded-2xl">
           <Ionicons name="stats-chart" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Aggregate Stats Cards */}
      <View className="flex-row gap-x-3 mb-6">
         <View className="flex-1 bg-emerald-500 p-4 rounded-3xl shadow-lg shadow-emerald-200">
            <Text className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest mb-1">Total Earnings</Text>
            <Text className="text-white font-outfit font-bold text-xl">₹{stats.total}</Text>
         </View>
         <View className="flex-1 bg-white border border-slate-100 p-4 rounded-3xl">
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Success Rate</Text>
            <Text className="text-slate-900 font-outfit font-bold text-xl">{stats.successRate}%</Text>
         </View>
      </View>

      {/* Time Segments Buttons */}
      <View className="flex-row bg-slate-100 p-1.5 rounded-2xl gap-x-2">
        {(['Daily', 'Weekly', 'Monthly'] as TimeSegment[]).map((s) => (
          <TouchableOpacity 
            key={s}
            onPress={() => setSegment(s)}
            className={`flex-1 py-3 rounded-xl items-center ${segment === s ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-xs ${segment === s ? 'text-sky-500' : 'text-slate-500'}`}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4">
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id || ''}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 p-8 mt-6">
              <View className="bg-slate-100 p-6 rounded-full mb-6">
                 <Ionicons name="receipt-outline" size={48} color="#94a3b8" />
              </View>
              <Text className="text-2xl font-outfit font-bold text-slate-900">No {segment} Records</Text>
              <Text className="text-slate-500 font-inter mt-3 text-center text-base">
                 Financial transactions for this period haven't been recorded yet.
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default TransactionsScreen;
