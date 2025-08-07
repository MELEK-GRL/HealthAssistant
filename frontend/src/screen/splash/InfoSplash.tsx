import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { useResponsive } from '../../utils/responsive';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'InfoSplash'>;

const InfoSplash = ({ navigation }: Props) => {
    const { w1px, h1px, fs1px } = useResponsive();



    const handleContinue = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                navigation.replace('Auth');
            } else {
                navigation.replace('Auth');
            }
        } catch (error) {
            console.error('Splash kontrol hatası:', error);
            navigation.replace('Auth');
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundLight,
            paddingHorizontal: 24 * w1px,
        },
        lottieWrapper: {
            alignItems: 'center',
            marginTop: 20 * h1px,
        },
        lottie: {
            width: 200 * w1px,
            height: 200 * h1px,
        },
        sectionTitle: {
            fontSize: 18 * fs1px,
            fontWeight: 'bold',
            color: colors.backgroundPruple,
            textAlign: 'center',
            marginBottom: 29 * h1px,
        },
        sectionText: {
            fontSize: 13 * fs1px,
            color: colors.textGray,
            lineHeight: 22 * h1px,
            textAlign: 'center',
            marginBottom: 12 * h1px,
        },
        scrollView: {
            paddingHorizontal: w1px * 24
        },
        button: {
            backgroundColor: colors.backgroundPruple,
            paddingVertical: 12 * h1px,
            paddingHorizontal: 36 * w1px,
            borderRadius: 10 * fs1px,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 30 * h1px,
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16 * fs1px,
            marginRight: 8 * w1px,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.lottieWrapper}>
                    <LottieView
                        source={require('../../assets/splashGif/health.json')}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                </View>
                <Text style={styles.sectionTitle}>Yapay Zeka Destekli Sağlık Asistanı</Text>
                <Text style={styles.sectionText}>
                    HealthGPT, yapay zekâ ile desteklenen bir sağlık asistanıdır. Kullanıcıların sağlık
                    sorularını yanıtlar, test sonuçlarını analiz eder ve bilgilendirici öneriler sunar.
                </Text>

                <Text style={styles.sectionTitle}>Uyarı ve Sorumluluk Reddi</Text>
                <Text style={styles.sectionText}>
                    Bu uygulama yalnızca bilgilendirme amaçlıdır. Verilen cevaplar profesyonel doktor
                    muayenesinin yerine geçemez. Her zaman bir sağlık uzmanına danışmanız önerilir.
                </Text>

                <Text style={styles.sectionTitle}>Acil Durumlar</Text>
                <Text style={styles.sectionText}>
                    Acil veya ciddi bir sağlık problemi yaşıyorsanız, lütfen vakit kaybetmeden en yakın sağlık
                    kuruluşuna başvurun.
                </Text>


                <TouchableOpacity
                    style={[styles.button]}
                    onPress={handleContinue}
                >
                    <Text style={[styles.buttonText]}>İleri</Text>
                    <Icon name="arrow-forward-outline" size={24 * fs1px} color={colors.textWhite} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default InfoSplash;
