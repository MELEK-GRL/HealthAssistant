import React from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';

const MainLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* Üst SafeArea boşluğu renkli gradient */}
      <LinearGradient
        colors={colors.backgroundPrupleGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
          width: '100%',

        }}
      />

      {/* Ana içerik */}
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <BottomTabNavigator />
      </SafeAreaView>

      {/* Alt çentik rengi (iPhone X ve üstü) */}
      {Platform.OS === 'ios' && insets.bottom > 0 && (
        <View style={{
          height: insets.bottom,
          backgroundColor: '#F8F8F8',
        }} />
      )}
    </>
  );
};

export default MainLayout;
