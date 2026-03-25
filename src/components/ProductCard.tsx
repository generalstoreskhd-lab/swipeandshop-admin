import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../types/models';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../constants/categories';

interface ProductCardProps {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    const category = CATEGORIES.find(c => c.id === product.categoryId);

    return (
        <View className="bg-white rounded-3xl p-4 mb-4 border border-slate-100 flex-row">
            {/* Product Image */}
            <View className="bg-slate-50 rounded-2xl w-24 h-24 items-center justify-center overflow-hidden">
                {product.images?.[0] ? (
                    <Image 
                        source={{ uri: product.images[0] }} 
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                ) : (
                    <Ionicons name="image-outline" size={32} color="#94a3b8" />
                )}
            </View>

            {/* Product Info */}
            <View className="flex-1 ml-4 justify-between">
                <View>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center bg-slate-50 px-2 py-1 rounded-full">
                            {category && <Ionicons name={category.icon as any} size={12} color="#64748b" />}
                            <Text className="text-[10px] text-slate-500 font-medium ml-1 uppercase tracking-wider">
                                {category?.name || 'Uncategorized'}
                            </Text>
                        </View>
                        <View className={`px-2 py-0.5 rounded-full ${product.isAvailable ? 'bg-emerald-50' : 'bg-red-50'}`}>
                            <Text className={`text-[10px] font-bold ${product.isAvailable ? 'text-emerald-600' : 'text-red-500'}`}>
                                {product.isAvailable ? 'IN STOCK' : 'OUT OF STOCK'}
                            </Text>
                        </View>
                    </View>
                    
                    <Text className="text-slate-900 font-outfit font-bold text-lg mt-1" numberOfLines={1}>
                        {product.name}
                    </Text>
                    <Text className="text-slate-500 font-inter text-xs" numberOfLines={1}>
                        {product.description}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-sky-500 font-outfit font-bold text-xl">
                        ₹{product.price}
                    </Text>
                    
                    <View className="flex-row gap-x-2">
                        <TouchableOpacity 
                            onPress={() => onEdit?.(product)}
                            className="bg-slate-50 p-2 rounded-xl"
                        >
                            <Ionicons name="create-outline" size={18} color="#64748b" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => onDelete?.(product)}
                            className="bg-red-50 p-2 rounded-xl"
                        >
                            <Ionicons name="trash-outline" size={18} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProductCard;
