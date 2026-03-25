import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_ORDERS } from '../constants/mockOrders';
import OrderCard from '../components/OrderCard';
import { Order, OrderStatus } from '../types/models';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

type TimeSegment = 'Daily' | 'Weekly' | 'Monthly';

const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [segment, setSegment] = useState<TimeSegment>('Daily');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  // Form states for status update
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('PENDING');
  const [paymentStatus, setPaymentStatus] = useState<Order['paymentStatus']>('PENDING');

  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  const generateInvoice = async (order: Order, action: 'WHATSAPP' | 'PDF') => {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 40px; }
            .logo { font-size: 28px; font-weight: bold; color: #0ea5e9; }
            .order-info { margin-bottom: 40px; }
            .order-info h2 { margin: 0; color: #1e293b; font-size: 20px; }
            .order-info p { margin: 5px 0; color: #64748b; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            th { text-align: left; padding: 12px; border-bottom: 1px solid #e2e8f0; color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; }
            td { padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .total-row td { font-weight: bold; font-size: 18px; color: #0ea5e9; padding-top: 20px; border-bottom: none; }
            .footer { margin-top: 60px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #f1f5f9; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">General Stores</div>
              <div style="color: #64748b; font-size: 14px; margin-top: 4px;">Kushavankunnu, Kanhangad</div>
            </div>
            <div style="text-align: right">
              <div style="font-weight: bold; font-size: 18px">INVOICE</div>
              <div style="color: #64748b; margin-top: 4px;">#${order.id}</div>
            </div>
          </div>
          <div class="order-info">
            <h2>Customer Details</h2>
            <p><strong>Customer ID:</strong> ${order.clientId}</p>
            <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod.type}</p>
            ${order.shippingAddress ? `<p><strong>Address:</strong> ${order.shippingAddress}</p>` : ''}
          </div>
          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th style="text-align: right">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price}</td>
                  <td style="text-align: right">₹${item.price * item.quantity}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="3" style="text-align: right">Total Amount Due</td>
                <td style="text-align: right">₹${order.totalAmount}</td>
              </tr>
            </tbody>
          </table>
          <div class="footer">
            <p>Thank you for shopping with General Stores!</p>
            <p>For support, contact support@generalstores.com</p>
          </div>
        </body>
      </html>
    `;

    try {
      // Close modal first so it doesn't appear in the background of the print preview
      setIsInvoiceModalVisible(false);
      
      // Small delay to let the modal finish its closing animation
      await new Promise(resolve => setTimeout(resolve, 300));

      if (Platform.OS === 'web') {
        // Create a hidden iframe for clean printing on Web
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);
        
        const doc = iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(html);
          doc.close();
          
          // Give the iframe content time to render before printing
          setTimeout(() => {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            // Cleanup after a slight delay
            setTimeout(() => document.body.removeChild(iframe), 1000);
          }, 500);
        }
      } else {
        const { uri } = await Print.printToFileAsync({ html });
        if (action === 'PDF') {
            await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } else {
            await Sharing.shareAsync(uri, { 
                UTI: '.pdf', 
                mimeType: 'application/pdf',
                dialogTitle: 'Share Invoice via WhatsApp'
            });
        }
      }
    } catch (error) {
      console.error('Invoice generation failed:', error);
      alert('Failed to generate invoice. Please try again.');
    }
  };

  const handleOpenInvoiceOptions = (order: Order) => {
    setSelectedOrderForInvoice(order);
    setIsInvoiceModalVisible(true);
  };

  const filteredOrders = useMemo(() => {
    const now = Date.now();
    const dayMs = 86400000;
    
    return orders.filter(o => {
        const timeDiff = now - (o.orderDate as number);
        if (segment === 'Daily') return timeDiff <= dayMs;
        if (segment === 'Weekly') return timeDiff <= dayMs * 7;
        if (segment === 'Monthly') return timeDiff <= dayMs * 30;
        return true;
    }).sort((a, b) => (b.orderDate as number) - (a.orderDate as number));
  }, [segment, orders]);

  const stats = useMemo(() => {
    const total = filteredOrders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const count = filteredOrders.length;
    const pending = filteredOrders.filter(o => o.status === 'PENDING').length;
    return { total, count, pending };
  }, [filteredOrders]);

  const handleEditStatus = (order: Order) => {
    setEditingOrder(order);
    setOrderStatus(order.status);
    setPaymentStatus(order.paymentStatus);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = () => {
    if (editingOrder) {
        setOrders(orders.map(o => 
            o.id === editingOrder.id 
                ? { ...o, status: orderStatus, paymentStatus } 
                : o
        ));
        setIsModalVisible(false);
    }
  };

  const renderHeader = () => (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-3xl font-outfit font-bold text-slate-950 tracking-tight">Recent Orders</Text>
          <Text className="text-slate-500 font-inter text-base mt-1">Manage and track your sales</Text>
        </View>
        <TouchableOpacity className="bg-slate-100 p-3 rounded-2xl">
           <Ionicons name="filter" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Aggregate Stats Cards */}
      <View className="flex-row gap-x-3 mb-6">
         <View className="flex-1 bg-sky-500 p-4 rounded-3xl shadow-lg shadow-sky-200">
            <Text className="text-sky-100 text-[10px] font-bold uppercase tracking-widest mb-1">Total Revenue</Text>
            <Text className="text-white font-outfit font-bold text-xl">₹{stats.total}</Text>
         </View>
         <View className="flex-1 bg-white border border-slate-100 p-4 rounded-3xl">
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Orders</Text>
            <Text className="text-slate-900 font-outfit font-bold text-xl">{stats.count}</Text>
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
          data={filteredOrders}
          keyExtractor={(item) => item.id || ''}
          renderItem={({ item }) => (
            <OrderCard 
              order={item} 
              onStatusUpdate={() => handleEditStatus(item)}
              onGenerateInvoice={handleOpenInvoiceOptions}
            />
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 p-8 mt-6">
              <View className="bg-slate-100 p-6 rounded-full mb-6">
                 <Ionicons name="cart-outline" size={48} color="#94a3b8" />
              </View>
              <Text className="text-2xl font-outfit font-bold text-slate-900">No {segment} Orders</Text>
              <Text className="text-slate-500 font-inter mt-3 text-center text-base">
                 Try checking other time ranges or wait for new orders.
              </Text>
            </View>
          )}
        />
      </View>

      {/* Update Status Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-[40px] p-8 pb-12">
                <View className="items-center mb-6">
                    <View className="w-12 h-1 bg-slate-200 rounded-full mb-6" />
                    <Text className="text-2xl font-outfit font-bold text-slate-900">Update Status</Text>
                    <Text className="text-slate-400 text-xs font-inter mt-1">Order #{editingOrder?.id}</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="gap-y-8">
                        {/* Order Status Section */}
                        <View>
                            <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Lifecycle Status</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as OrderStatus[]).map((s) => (
                                    <TouchableOpacity 
                                        key={s}
                                        onPress={() => setOrderStatus(s)}
                                        className={`px-4 py-3 rounded-2xl border ${orderStatus === s ? 'bg-sky-500 border-sky-500' : 'bg-slate-50 border-slate-100'}`}
                                    >
                                        <Text className={`font-bold text-[10px] ${orderStatus === s ? 'text-white' : 'text-slate-500'}`}>{s}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Payment Status Section */}
                        <View>
                            <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Payment Status</Text>
                            <View className="flex-row gap-x-2">
                                {(['PENDING', 'PAID', 'FAILED', 'REFUNDED'] as Order['paymentStatus'][]).map((s) => (
                                    <TouchableOpacity 
                                        key={s}
                                        onPress={() => setPaymentStatus(s)}
                                        className={`flex-1 py-3 rounded-2xl border items-center ${paymentStatus === s ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-50 border-slate-100'}`}
                                    >
                                        <Text className={`font-bold text-[10px] ${paymentStatus === s ? 'text-white' : 'text-slate-500'}`}>{s}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View className="flex-row gap-x-4 mt-4">
                            <TouchableOpacity 
                                onPress={() => setIsModalVisible(false)}
                                className="flex-1 border border-slate-200 p-4 rounded-2xl items-center"
                            >
                                <Text className="text-slate-600 font-bold font-inter text-base">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleUpdateStatus}
                                className="flex-1 bg-sky-500 p-4 rounded-2xl items-center shadow-lg shadow-sky-200"
                            >
                                <Text className="text-white font-bold font-inter text-base">Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
      </Modal>

      {/* Invoice Options Modal */}
      <Modal
        visible={isInvoiceModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsInvoiceModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-6">
            <View className="bg-white rounded-[40px] p-8 w-full shadow-2xl">
                <View className="items-center mb-6">
                    <View className="bg-sky-50 p-4 rounded-full mb-4">
                        <Ionicons name="receipt" size={32} color="#0ea5e9" />
                    </View>
                    <Text className="text-2xl font-outfit font-bold text-slate-900">Invoice Options</Text>
                    <Text className="text-slate-400 text-sm font-inter text-center mt-2 px-4">
                        Choose how you would like to handle the invoice for order #{selectedOrderForInvoice?.id}
                    </Text>
                </View>

                <View className="gap-y-4">
                    <TouchableOpacity 
                        onPress={() => selectedOrderForInvoice && generateInvoice(selectedOrderForInvoice, 'WHATSAPP')}
                        className="bg-emerald-500 p-5 rounded-[24px] flex-row items-center shadow-lg shadow-emerald-200"
                    >
                        <Ionicons name="logo-whatsapp" size={24} color="white" />
                        <Text className="text-white font-bold font-inter text-base ml-3">Share by WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => selectedOrderForInvoice && generateInvoice(selectedOrderForInvoice, 'PDF')}
                        className="bg-slate-900 p-5 rounded-[24px] flex-row items-center shadow-lg shadow-slate-300"
                    >
                        <Ionicons name="document-text" size={24} color="white" />
                        <Text className="text-white font-bold font-inter text-base ml-3">Save as PDF</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => setIsInvoiceModalVisible(false)}
                        className="mt-2 p-4 rounded-2xl items-center"
                    >
                        <Text className="text-slate-400 font-bold font-inter text-sm uppercase tracking-widest">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OrdersScreen;
