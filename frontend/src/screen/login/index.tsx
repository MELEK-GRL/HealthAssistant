import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';
import { useResponsive } from '../../utils/responsive';
import colors from '../../theme/colors';
import AuthCard from '../../components/card/AuthCard';
import { useUserStore } from '../../store/userStore';

const Login = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { w1px, h1px, fs1px } = useResponsive();
  const setUser = useUserStore(state => state.setUser);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        setUser(data.user);

        navigation.replace('MainLayout');
      } else {
        Alert.alert('Giriş Hatalı', data.message || 'Hatalı kullanıcı adı ya da şifre');
      }
    } catch (error: any) {
      console.error('❌ Login error:', error.message || error);
      Alert.alert('Sunucu Hatası', error.message || 'Sunucuya bağlanılamadı.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLight,
      justifyContent: 'center',

    },
    safeAreaView: {
      flex: 1,
      justifyContent: 'center',

    },

    title: {
      fontSize: 26 * fs1px,
      fontWeight: 'bold',
      marginBottom: 28 * h1px,
      textAlign: 'center',
    },
    input: {
      backgroundColor: '#fff',
      padding: 14 * h1px,
      borderRadius: 10 * fs1px,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 16 * h1px,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 16 * h1px,
      borderRadius: 10 * fs1px,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16 * fs1px,
    },
    link: {
      marginTop: 20 * h1px,
      color: '#007AFF',
      textAlign: 'center',
      fontSize: 14 * fs1px,
    },
    scrollContainer: {
      flex: 1,
    },
    avatar: {
      width: 80 * w1px,
      height: 80 * w1px,
      borderRadius: 90,
      borderWidth: 1,
      borderColor: colors.backgroundPruple,
    },
    avatarContainer: {
      alignItems: 'center',
      width: '100%',
      marginBottom: h1px * 40
    }
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingVertical: h1px * 100 }}>
            <View style={styles.avatarContainer}>
              <Image source={require('../../assets/icons/historyIcon.png')} style={styles.avatar} />
            </View>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <AuthCard
                titleName={'Giriş Yap'}
                firstPlaceholder="Kullanıcı Adı"
                firstIconName={"person-outline"}
                firstValue={name}
                firstOnChangeText={setName}
                secondIconName={"lock-closed-outline"}
                secondPlaceholder="Şifre"
                secondValue={password}
                secondOnChangeText={setPassword}
                onLoginPress={handleLogin}
                onRegisterPress={() => navigation.navigate('Register')}
                text={'Kayıt Ol'}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </View>
  );
};

export default Login;
