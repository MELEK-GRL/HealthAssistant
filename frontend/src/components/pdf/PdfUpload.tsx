import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { pick, types } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import { useResponsive } from '../../utils/responsive';

type Props = {
  onPdfSelected: (pdf: { name: string; base64: string }) => void;
  selectedPdf?: { name: string };
};

const PdfUpload: React.FC<Props> = ({ onPdfSelected, selectedPdf }) => {
  const { w1px, h1px, fs1px } = useResponsive();


  const styles = StyleSheet.create({
    iconWrapper: {
      marginLeft: w1px * 10,
      padding: w1px * 10,
    },
  });

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Depolama İzni',
          message: 'PDF dosyası seçebilmek için erişim izni gerekli.',
          buttonNeutral: 'Daha sonra sor',
          buttonNegative: 'İptal',
          buttonPositive: 'Tamam',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickPdf = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('İzin reddedildi', 'PDF seçmek için depolama izni gerekli.');
      return;
    }

    try {
      const files = await pick({ type: [types.pdf] });

      if (!files || files.length === 0) {
        Alert.alert('Hata', 'PDF dosyası seçilmedi.');
        return;
      }

      const file = files[0];
      let fileUri = file.uri;

      if (!fileUri) {
        Alert.alert('Hata', 'Dosya URI alınamadı.');
        return;
      }

      if (Platform.OS === 'ios' && fileUri.startsWith('file://')) {
        fileUri = fileUri.replace('file://', '');
      }

      const decodedPath = decodeURIComponent(fileUri);
      const exists = await RNFS.exists(decodedPath);

      if (!exists) {
        Alert.alert('Hata', 'PDF dosyasına erişilemedi.');
        return;
      }

      const base64 = await RNFS.readFile(decodedPath, 'base64');
      const name = file.name || 'dosya.pdf';

      onPdfSelected({ name, base64 });
      Alert.alert('Başarılı', `PDF yüklendi: ${name}`);
    } catch (error: any) {
      console.error('📄 PDF seçme hatası:', error);
      Alert.alert('Hata', 'PDF seçilirken bir sorun oluştu.');
    }
  };

  return (
    <TouchableOpacity style={styles.iconWrapper} onPress={pickPdf}>
      <Icon
        name={selectedPdf ? 'checkmark-circle-outline' : 'document-attach-outline'}
        size={fs1px * 26}
        color={selectedPdf ? 'green' : colors.buttonPruple}
      />
    </TouchableOpacity>
  );
};



export default PdfUpload;
