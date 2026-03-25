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
        <View className="bg-slate-50 rounded-[32px] p-5 mb-5 border border-slate-200 shadow-sm shadow-slate-100">
            <View className="flex-row">
                {/* Product Image */}
                <View className="bg-white rounded-2xl w-24 h-24 items-center justify-center overflow-hidden border border-slate-100 shadow-sm">
                    {product.images?.[0] ? (
                        <Image 
                            source={{ uri: product.images[0] }} 
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons name="image-outline" size={32} color="#94a3b8" />
                    )}
                </View>

                {/* Product Info */}
                <View className="flex-1 ml-4 justify-between">
                    <View>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center bg-white px-2 py-1 rounded-full border border-slate-100">
                                {category && <Ionicons name={category.icon as any} size={10} color="#64748b" />}
                                <Text className="text-[9px] text-slate-500 font-bold ml-1 uppercase tracking-wider">
                                    {category?.name || 'Uncategorized'}
                                </Text>
                            </View>
                            <View className={`px-2 py-0.5 rounded-full border ${product.isAvailable && product.stockQuantity > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                                <Text className={`text-[9px] font-bold ${product.isAvailable && product.stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {product.isAvailable && product.stockQuantity > 0 ? 'STOCK' : 'OUT'}
                                </Text>
                            </View>
                        </View>
                        
                        <Text className="text-slate-950 font-outfit font-bold text-lg mt-2" numberOfLines={1}>
                            {product.name}
                        </Text>
                        <Text className="text-slate-500 font-inter text-xs" numberOfLines={1}>
                            {product.description || 'No description provided'}
                        </Text>
                    </View>

                    <View className="mt-3 gap-y-1.5">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Price per {product.unit.toLowerCase()}</Text>
                            <Text className="text-sky-500 font-outfit font-bold text-lg">₹{product.price}</Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Inventory</Text>
                            <View className="flex-row items-center bg-white px-2 py-0.5 rounded-lg border border-slate-100 shadow-sm shadow-slate-200/50">
                                <Ionicons name="cube-outline" size={10} color="#64748b" />
                                <Text className="text-[9px] text-slate-500 font-bold ml-1">
                                    {product.stockQuantity} {product.unit === 'PACKET' ? 'Packets' : product.unit === 'KG' ? 'KG' : 'Litres'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Actions Footer */}
            <View className="flex-row items-center justify-end mt-4 pt-4 border-t border-slate-200 gap-x-3">
                <TouchableOpacity 
                    onPress={() => onEdit?.(product)}
                    className="flex-row items-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
                >
                    <Ionicons name="pencil" size={14} color="#64748b" />
                    <Text className="text-slate-600 font-bold text-[11px] ml-2">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => onDelete?.(product)}
                    className="flex-row items-center bg-red-50 px-4 py-2 rounded-xl border border-red-100 shadow-sm shadow-red-100"
                >
                    <Ionicons name="trash" size={14} color="#ef4444" />
                    <Text className="text-red-500 font-bold text-[11px] ml-2">Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductCard;
