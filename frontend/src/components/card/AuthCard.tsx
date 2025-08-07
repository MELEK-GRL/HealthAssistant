import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useResponsive } from '../../utils/responsive';
import colors from '../../theme/colors';

interface Props {
    titleName?: string;
    text?: string;

    firstIconName?: string;
    firstPlaceholder?: string;
    firstPlaceholderTextColor?: string;
    firstValue?: string;
    firstOnChangeText?: (val: string) => void;

    secondIconName?: string;
    secondPlaceholder?: string;
    secondPlaceholderTextColor?: string;
    secondValue?: string;
    secondOnChangeText?: (val: string) => void;

    thirdIconName?: string;
    thirdPlaceholder?: string;
    thirdPlaceholderTextColor?: string;
    thirdValue?: string;
    thirdOnChangeText?: (val: string) => void;

    onLoginPress?: () => void;
    onRegisterPress?: () => void;
}


const AuthCard: React.FC<Props> = ({
    titleName,
    text,
    firstIconName,
    firstPlaceholder,
    firstPlaceholderTextColor = '#999',
    firstValue,
    firstOnChangeText,
    secondIconName,
    secondPlaceholder,
    secondPlaceholderTextColor = '#999',
    secondValue,
    secondOnChangeText,
    onLoginPress,
    onRegisterPress,
    thirdIconName,
    thirdOnChangeText,
    thirdPlaceholder,
    thirdValue,
    thirdPlaceholderTextColor = '#999',
}) => {
    const { w1px, h1px, fs1px } = useResponsive();

    const styles = StyleSheet.create({
        content: {
            paddingHorizontal: w1px * 20
        },
        container: {
            backgroundColor: '#fff',
            borderRadius: w1px * 16,
            padding: w1px * 30,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: h1px * 2 },
            shadowRadius: w1px * 8,
            elevation: 3,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.backgroundPrupleSoft
        },
        title: {
            fontSize: fs1px * 20,
            fontWeight: 'bold',
            color: '#1e1e1e',
            marginBottom: h1px * 20,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            borderColor: '#eee',
            borderWidth: 1,
            borderRadius: w1px * 12,
            paddingHorizontal: w1px * 12,
            marginVertical: h1px * 8,
            width: '100%',
        },
        icon: {
            marginRight: w1px * 8,
            color: '#888',
        },
        input: {
            flex: 1,
            color: '#333',
            fontSize: fs1px * 14,
            height: h1px * 45,
        },
        button: {
            backgroundColor: colors.buttonPruple,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: h1px * 44,
            borderRadius: w1px * 8,
            marginTop: h1px * 16,
        },
        buttonText: {
            color: '#fff',
            fontWeight: '600',
            fontSize: fs1px * 16,
        },
        bottomText: {
            marginTop: h1px * 12,
            color: colors.textGray,
            fontSize: fs1px * 13,
        },
        registerText: {
            color: '#7067F0',
            fontWeight: '500',
        },
    });

    return (
        <View style={styles.content}>
            <View style={styles.container}>
                <Text style={styles.title}>{titleName}</Text>
                {
                    firstPlaceholder && firstIconName &&
                    <View style={styles.inputContainer}>
                        <Icon name={firstIconName} size={fs1px * 16} style={styles.icon} />
                        <TextInput
                            placeholder={firstPlaceholder}
                            placeholderTextColor={firstPlaceholderTextColor}
                            value={firstValue}
                            onChangeText={firstOnChangeText}
                            style={styles.input}
                            autoCapitalize="none"
                        />
                    </View>
                }

                {
                    secondPlaceholder && secondIconName
                    && <View style={styles.inputContainer}>

                        <Icon name={secondIconName} size={fs1px * 16} style={styles.icon} />
                        <TextInput
                            placeholder={secondPlaceholder}
                            placeholderTextColor={secondPlaceholderTextColor}
                            value={secondValue}
                            onChangeText={secondOnChangeText}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                }

                {thirdPlaceholder && thirdIconName &&
                    <View style={styles.inputContainer}>
                        <Icon name={thirdIconName} size={fs1px * 16} style={styles.icon} />
                        <TextInput
                            placeholder={thirdPlaceholder}
                            placeholderTextColor={thirdPlaceholderTextColor}
                            value={thirdValue}
                            onChangeText={thirdOnChangeText}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                }
                <TouchableOpacity onPress={onLoginPress} style={styles.button}>
                    <Text style={styles.buttonText}>{titleName}</Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    Hesabınız yok mu?{' '}
                    <Text style={styles.registerText} onPress={onRegisterPress}>
                        {text}
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default AuthCard;
