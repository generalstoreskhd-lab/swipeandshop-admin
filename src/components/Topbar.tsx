import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';
import { useNavigation } from '@react-navigation/native';

interface TopbarProps {
  title: string;
}

const Topbar: React.FC<TopbarProps> = ({ title }) => {
  const { isLoggedIn, adminName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminLogin' }],
      });
    } else {
      navigation.navigate('AdminLogin');
    }
  };

  return (
    <View className="w-full bg-white px-4 pt-12 pb-4 flex-row items-center justify-between border-b border-slate-100">
      <View>
        <Text className="text-slate-500 font-medium text-sm">
          {isLoggedIn ? `Welcome,` : 'Dashboard'}
        </Text>
        <Text className="text-slate-900 font-outfit font-bold text-xl">
          {isLoggedIn ? (adminName || 'Admin') : 'Guest Access'}
        </Text>
      </View>

      <TouchableOpacity 
        onPress={handleAuthAction}
        className={`flex-row items-center px-4 py-2 rounded-full ${isLoggedIn ? 'bg-red-50' : 'bg-sky-50'}`}
      >
        <Ionicons 
          name={isLoggedIn ? "log-out-outline" : "log-in-outline"} 
          size={18} 
          color={isLoggedIn ? "#ef4444" : "#0ea5e9"} 
        />
        <Text className={`ml-2 font-semibold text-sm ${isLoggedIn ? 'text-red-500' : 'text-sky-500'}`}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Topbar;
