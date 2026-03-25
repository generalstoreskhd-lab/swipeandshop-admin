import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_PRODUCTS } from '../constants/mockData';
import ProductCard from '../components/ProductCard';

const InventoryScreen = () => {
  const renderHeader = () => (
    <View className="mb-6">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-3xl font-outfit font-bold text-slate-950 tracking-tight">Inventory</Text>
          <Text className="text-slate-500 font-inter mt-1 text-base">
            Total {MOCK_PRODUCTS.length} products listed
          </Text>
        </View>
        <TouchableOpacity className="bg-sky-500 p-3 rounded-2xl shadow-sm shadow-sky-200">
           <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4">
        <FlatList
          data={MOCK_PRODUCTS}
          keyExtractor={(item) => item.id || ''}
          renderItem={({ item }) => <ProductCard product={item} />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8 mt-10">
              <View className="bg-slate-100 p-4 rounded-full mb-4">
                 <Ionicons name="cube-outline" size={40} color="#94a3b8" />
              </View>
              <Text className="text-xl font-outfit font-bold text-slate-900">Empty Catalog</Text>
              <Text className="text-slate-500 font-inter mt-2 text-center text-base">
                Start adding products to your inventory to see them listed here.
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default InventoryScreen;
