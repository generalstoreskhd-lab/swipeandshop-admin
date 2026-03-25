import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text, View } from 'react-native';
import OrdersScreen from '../screens/OrdersScreen';
import InventoryScreen from '../screens/InventoryScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import { useNavigation } from '@react-navigation/native';
import Topbar from '../components/Topbar';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    // Implement actual logout logic here (e.g., Firebase auth)
    navigation.reset({
      index: 0,
      routes: [{ name: 'AdminLogin' }],
    });
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Topbar title={route.name} />,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'list';

          if (route.name === 'Orders') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Inventory') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0ea5e9', // sky-500
        tabBarInactiveTintColor: '#94a3b8', // slate-400
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9', // slate-100
          height: 70,
          paddingBottom: 12,
          paddingTop: 12,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f1f5f9',
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'Outfit_700Bold',
          fontSize: 22,
          color: '#0f172a',
        },
      })}
    >
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Inventory" component={InventoryScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
