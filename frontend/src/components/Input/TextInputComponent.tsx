import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PdfUpload from '../pdf/PdfUpload';
import Icon from 'react-native-vector-icons/Ionicons';
import { useResponsive } from '../../utils/responsive';
import colors from '../../theme/colors';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
  onPdfSelected: (pdf: { name: string; base64: string }) => void;
  selectedPdf?: { name: string };
};

const TextInputComponent: React.FC<Props> = ({
  value,
  onChangeText,
  onSendPress,
  onPdfSelected,
  selectedPdf,
}) => {
  const sendEnabled = value.trim() !== '' || selectedPdf;
  const styles = useResponsiveStyles();

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Sağlık sorununu yaz..."
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
        />
      </View>

      <PdfUpload onPdfSelected={onPdfSelected} selectedPdf={selectedPdf} />

      <TouchableOpacity
        style={[styles.sendButton, { opacity: sendEnabled ? 1 : 0.5 }]}
        disabled={!sendEnabled}
        onPress={onSendPress}
      >
        <Icon name="send" size={20 * styles.fs1px} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const useResponsiveStyles = () => {
  const { w1px, h1px, fs1px } = useResponsive();

  const styles = StyleSheet.create({

    container: {
      flexDirection: 'row',
      paddingHorizontal: 10 * w1px,
      paddingVertical: 8 * h1px,
      backgroundColor: '#fff',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },

    inputArea: {
      flex: 1,
      backgroundColor: colors.textInput,
      borderRadius: 25 * fs1px,
      paddingHorizontal: 15 * w1px,
      paddingVertical: 16 * h1px,
      justifyContent: 'center'
    },
    input: {
      fontSize: 16 * fs1px,
      color: colors.textGray,
      maxHeight: 100 * h1px,
    },
    sendButton: {
      backgroundColor: colors.buttonPruple,
      borderRadius: 25 * fs1px,
      padding: 10 * fs1px,

    },

  });

  return { ...styles, fs1px };
};

export default TextInputComponent;
