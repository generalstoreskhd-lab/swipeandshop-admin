import React from 'react';
import "../global.css";
import { Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminLoginScreen from './screens/AdminLoginScreen';
import MainTabNavigator from './navigation/MainTabNavigator';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
                    <Stack.Screen name="Home" component={MainTabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

registerRootComponent(App);