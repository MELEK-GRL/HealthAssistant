import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../../navigation/context/AppContext';
import { useResponsive } from '../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import CenterModal from '../../components/modal/CenterModal';
import colors from '../../theme/colors';
import { useUserStore } from '../../store/userStore';
import TopBar from '../../components/TopBar/TopBar';

const avatarPlaceholder = 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainLayout'>;

const User = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { setIsLoggedIn } = useAppContext();
  const { w1px, h1px, fs1px } = useResponsive();
  const user = useUserStore(state => state.user);
  const clearUser = useUserStore(state => state.clearUser);

  const styles = StyleSheet.create({
    content: { flex: 1 },
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLight,
      padding: 24 * fs1px,
      justifyContent: 'center',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 16 * fs1px,
      padding: 24 * fs1px,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 8,
      elevation: 5,
    },
    avatar: {
      width: 90 * w1px,
      height: 90 * w1px,
      borderRadius: 90,
      marginBottom: 16 * h1px,
      borderWidth: 2,
      borderColor: colors.backgroundPruple,
    },
    name: {
      fontSize: 20 * fs1px,
      fontWeight: '700',
      color: colors.textDark,
      marginBottom: 4 * h1px,
    },
    email: {
      fontSize: 15 * fs1px,
      color: colors.textLight,
      marginBottom: 20 * h1px,
    },
    logoutButton: {
      marginTop: 32 * h1px,
      backgroundColor: colors.backgroundPruple,
      paddingVertical: 14 * h1px,
      paddingHorizontal: 20 * w1px,
      borderRadius: 12 * fs1px,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 4,
      alignSelf: 'center',
    },
    logoutText: {
      fontSize: 16 * fs1px,
      fontWeight: '600',
      color: colors.textWhite,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: fs1px * 16,
      color: '#666',
    },
  });

  const confirmLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'user']);
      clearUser();
      setIsLoggedIn(false);
      setModalVisible(false);
      navigation.replace('Auth');
    } catch (error) {
      console.error('Çıkış sırasında hata:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <TopBar />
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: avatarPlaceholder }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          {user.email && <Text style={styles.email}>{user.email}</Text>}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>

        <CenterModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={confirmLogout}
          message="Oturumu kapatmak istiyor musun?"
        />
      </View>
    </View>
  );
};

export default User;
