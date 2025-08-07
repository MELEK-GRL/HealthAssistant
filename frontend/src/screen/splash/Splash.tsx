import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { useResponsive } from '../../utils/responsive';

import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({ navigation }: Props) => {
  const { w1px, h1px, fs1px } = useResponsive();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: colors.backgroundPruple,
      paddingVertical: 12 * h1px,
      paddingHorizontal: 36 * w1px,
      borderRadius: 10 * fs1px,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 24 * h1px,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16 * fs1px,
      marginRight: 8 * w1px,
    },
  });


  const handleContinue = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        navigation.replace('InfoSplash');
      } else {
        navigation.replace('InfoSplash');
      }
    } catch (error) {
      console.error('Splash kontrol hatası:', error);
      navigation.replace('Auth');
    }
  };


  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/splashGif/health.json')}
        autoPlay
        loop
        style={{ width: 300 * w1px, height: 300 * h1px }}
      />

      <TouchableOpacity
        style={[styles.button]}
        onPress={handleContinue}
      >
        <Text style={[styles.buttonText]}>İleri</Text>
        <Icon name="arrow-forward-outline" size={24 * fs1px} color={colors.textWhite} />
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

