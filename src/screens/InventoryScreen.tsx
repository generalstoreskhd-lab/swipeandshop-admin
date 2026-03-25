import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Modal, TextInput, Switch, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MOCK_PRODUCTS } from '../constants/mockData';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/models';
import { CATEGORIES } from '../constants/categories';

const InventoryScreen = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState<Product['unit']>('PACKET');
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setPrice('');
    setStock('');
    setUnit('PACKET');
    setCategoryId(CATEGORIES[0].id);
    setIsAvailable(true);
    setSelectedImage(null);
    setSelectedProduct(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setStock(product.stockQuantity.toString());
    setUnit(product.unit);
    setCategoryId(product.categoryId);
    setIsAvailable(product.isAvailable);
    setSelectedImage(product.images?.[0] || null);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDelete = (product: Product) => {
    setProducts(products.filter(p => p.id !== product.id));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name.trim() || !price.trim()) return;

    const numericPrice = parseFloat(price) || 0;
    const numericStock = parseInt(stock) || 0;

    const productData = {
      name,
      price: numericPrice,
      stockQuantity: numericStock,
      unit,
      categoryId,
      isAvailable: numericStock > 0 ? isAvailable : false, // Auto-set unavailable if stock is 0
      images: selectedImage ? [selectedImage] : [],
    };

    if (isEditMode && selectedProduct) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, ...productData } 
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        brand: 'Generic',
        description: 'New product added to inventory',
        createdAt: Date.now(),
        ...productData
      };
      setProducts([newProduct, ...products]);
    }
    setIsModalVisible(false);
  };

  const renderHeader = () => (
    <View className="mb-6">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-3xl font-outfit font-bold text-slate-950 tracking-tight">Inventory</Text>
          <Text className="text-slate-500 font-inter mt-1 text-base">
            Total {products.length} products listed
          </Text>
        </View>
        <TouchableOpacity 
          onPress={handleAddNew}
          className="bg-sky-500 p-3 rounded-2xl shadow-sm shadow-sky-200"
        >
           <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4">
        <FlatList
          data={products}
          keyExtractor={(item) => item.id || ''}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
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

      {/* Product Modal (Add/Edit) */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-[40px] p-8 pb-12 w-full max-h-[90%]">
            <View className="items-center mb-6">
               <View className="w-12 h-1 bg-slate-200 rounded-full mb-6" />
               <Text className="text-2xl font-outfit font-bold text-slate-900">{isEditMode ? 'Edit Product' : 'Add New Product'}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="gap-y-6">
                {/* Image Picker */}
                <View className="items-center">
                  <TouchableOpacity 
                    onPress={pickImage}
                    className="w-32 h-32 bg-slate-100 rounded-3xl items-center justify-center overflow-hidden border-2 border-dashed border-slate-300"
                  >
                    {selectedImage ? (
                      <Image source={{ uri: selectedImage }} className="w-full h-full" />
                    ) : (
                      <View className="items-center">
                        <Ionicons name="camera" size={32} color="#94a3b8" />
                        <Text className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Add Photo</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  {selectedImage && (
                    <TouchableOpacity onPress={() => setSelectedImage(null)} className="mt-2">
                       <Text className="text-red-500 font-bold text-xs uppercase tracking-tighter">Remove Photo</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View>
                  <Text className="text-slate-500 font-semibold mb-2 ml-1 font-inter uppercase text-[10px] tracking-widest">Product Details</Text>
                  <TextInput
                    className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-slate-900 font-inter text-base mb-4"
                    value={name}
                    onChangeText={setName}
                    placeholder="E.g. Fresh Milk"
                  />
                  <View className="gap-y-4">
                    <View>
                      <Text className="text-slate-500 font-semibold mb-2 ml-1 font-inter uppercase text-[10px] tracking-widest">Price per unit (₹)</Text>
                      <TextInput
                        className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-slate-900 font-inter text-base"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        placeholder="0.00"
                      />
                    </View>
                    <View>
                      <Text className="text-slate-500 font-semibold mb-2 ml-1 font-inter uppercase text-[10px] tracking-widest">Total Stock Quantity</Text>
                      <TextInput
                        className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-slate-900 font-inter text-base"
                        value={stock}
                        onChangeText={setStock}
                        keyboardType="numeric"
                        placeholder="e.g. 100"
                      />
                    </View>
                  </View>
                </View>

                <View>
                  <Text className="text-slate-500 font-semibold mb-3 ml-1 font-inter uppercase text-[10px] tracking-widest">Pricing Unit</Text>
                  <View className="flex-row gap-x-2">
                    {(['PACKET', 'KG', 'LITRE'] as const).map((u) => (
                      <TouchableOpacity 
                        key={u}
                        onPress={() => setUnit(u)}
                        className={`flex-1 py-3 rounded-2xl items-center border ${unit === u ? 'bg-sky-500 border-sky-500' : 'bg-slate-50 border-slate-100'}`}
                      >
                         <Text className={`font-bold font-inter text-xs ${unit === u ? 'text-white' : 'text-slate-500'}`}>
                           {u}
                         </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-slate-500 font-semibold mb-3 ml-1 font-inter uppercase text-[10px] tracking-widest">Select Category</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                    {CATEGORIES.map((cat) => (
                      <TouchableOpacity 
                        key={cat.id}
                        onPress={() => setCategoryId(cat.id)}
                        className={`mr-3 px-5 py-3 rounded-2xl flex-row items-center border ${categoryId === cat.id ? 'bg-sky-500 border-sky-500' : 'bg-slate-50 border-slate-100'}`}
                      >
                         <Ionicons 
                           name={cat.icon as any} 
                           size={16} 
                           color={categoryId === cat.id ? 'white' : '#64748b'} 
                         />
                         <Text className={`ml-2 font-bold font-inter ${categoryId === cat.id ? 'text-white' : 'text-slate-500'}`}>
                           {cat.name}
                         </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View className="flex-row items-center justify-between bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 mt-2">
                  <View>
                    <Text className="text-slate-900 font-semibold text-base font-inter">In Stock</Text>
                    <Text className="text-slate-500 text-xs font-inter">Toggle availability in store</Text>
                  </View>
                  <Switch
                    value={isAvailable}
                    onValueChange={setIsAvailable}
                    trackColor={{ false: '#e2e8f0', true: '#10b98166' }}
                    thumbColor={isAvailable ? '#10b981' : '#94a3b8'}
                    disabled={parseInt(stock) === 0}
                  />
                </View>

                <View className="flex-row gap-x-4 mt-4">
                  <TouchableOpacity 
                    onPress={() => setIsModalVisible(false)}
                    className="flex-1 border border-slate-200 p-4 rounded-2xl items-center"
                  >
                    <Text className="text-slate-600 font-bold font-inter text-base">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={handleSave}
                    className="flex-1 bg-sky-500 p-4 rounded-2xl items-center shadow-lg shadow-sky-200"
                  >
                    <Text className="text-white font-bold font-inter text-base">{isEditMode ? 'Update' : 'Add to Inventory'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InventoryScreen;
