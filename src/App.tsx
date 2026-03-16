import React from 'react';
import "../global.css";
import { Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import RootNavigation from './navigation/Rootnavigation';

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

registerRootComponent(App);