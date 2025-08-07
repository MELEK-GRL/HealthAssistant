import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '@env';
import { useResponsive } from '../../utils/responsive';
import AuthCard from '../../components/card/AuthCard';
import colors from '../../theme/colors';
import { useUserStore } from '../../store/userStore';

const Register = () => {
  const navigation = useNavigation();
  const { w1px, h1px, fs1px } = useResponsive();
  const setUser = useUserStore(state => state.setUser);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const body: any = {
        name,
        password,
      };

      if (email.trim() !== '') {
        body.email = email.trim();
      }

      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        setUser(data.user);

        navigation.navigate('MainLayout' as never);
      } else {
        Alert.alert('Başarısız', data.message || 'Hata oluştu.');
      }
    } catch (error: any) {
      console.error('❌ Register error:', error.message || error);
      Alert.alert('Bağlantı Hatası', 'Sunucuya ulaşılamıyor.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLight,
      justifyContent: 'center',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingBottom: h1px * 40,
    },
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#f5f6ff' }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <AuthCard
            titleName={'Kayıt Ol'}
            firstPlaceholder="Kullanıcı Adı"
            firstIconName="person-outline"
            firstValue={name}
            firstOnChangeText={setName}
            secondIconName="mail-outline"
            secondPlaceholder="E-posta (opsiyonel)"
            secondValue={email}
            secondOnChangeText={setEmail}
            thirdIconName="lock-closed-outline"
            thirdPlaceholder="Şifre"
            thirdValue={password}
            thirdOnChangeText={setPassword}
            onLoginPress={handleRegister}
            onRegisterPress={() => navigation.navigate('Login' as never)}
            text={'Giriş Yap'}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;
