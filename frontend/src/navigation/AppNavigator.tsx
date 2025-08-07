import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AutNavigator';
import MainLayout from '../components/layout/MainLayout';
import Splash from '../screen/splash/Splash';
import { RootStackParamList } from './NavigationTypes';
import InfoSplash from '../screen/splash/InfoSplash';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="InfoSplash" component={InfoSplash} />
      <Stack.Screen name="MainLayout" component={MainLayout} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
