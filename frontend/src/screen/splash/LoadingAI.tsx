import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useResponsive } from '../../utils/responsive';

const LoadingAI = () => {
  const { w1px, h1px, fs1px } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f4ff',
    },
    animation: {
      width: 300 * w1px,
      height: 300 * h1px,
    },
    loadingText: {
      marginTop: 20 * h1px,
      fontSize: 18 * fs1px,
      color: '#4B7BE5',
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/loadingAIGif/AIbot2.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.loadingText}>Cevabınız hazırlanıyor...</Text>
    </View>
  );
};

export default LoadingAI;
