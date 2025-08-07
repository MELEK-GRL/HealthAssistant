import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';

import colors from '../../theme/colors';
import { useResponsive } from '../../utils/responsive';
import { useUserStore } from '../../store/userStore';
import { useChatStore } from '../../store/chatStore';
import type { Message } from '../../screen/chat'; // <- doğru path'e göre güncelle
import { useNavigation } from '@react-navigation/native';

const TopBar: React.FC = () => {
    const { w1px, h1px, fs1px } = useResponsive();
    const { user } = useUserStore();
    const { setMessages, setCurrentConversationId } = useChatStore();
    const navigation = useNavigation(); // 🔹 EKLENDİ

    const handleNewChat = () => {
        if (user?.name) {
            // const welcomeMessage: Message = {
            //     id: uuid.v4().toString(),
            //     text: `👨‍⚕️ Merhaba ${user.name}! Ben yapay zekâ destekli sağlık asistanınızım. Size nasıl yardımcı olabilirim?`,
            //     sender: 'ai',
            // };
            // setMessages([welcomeMessage]);
            // setCurrentConversationId(null);
            navigation.navigate('Chat' as never); // 🔹 Chat sayfasına yönlendir
        }
    };

    return (
        <LinearGradient
            colors={colors.backgroundPrupleGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
                styles.headerContent,
                {
                    height: h1px * 80,
                    borderBottomLeftRadius: fs1px * 8,
                    borderBottomRightRadius: fs1px * 8,
                },
            ]}
        >
            <View style={[styles.viewContainer, { marginHorizontal: w1px * 12 }]}>
                <TouchableOpacity
                    style={[
                        styles.newChatButton,
                        {
                            paddingVertical: 8 * h1px,
                            paddingHorizontal: 14 * w1px,
                            borderRadius: 20 * fs1px,
                        },
                    ]}
                    onPress={handleNewChat}
                >
                    <View style={styles.newChatContent}>
                        <Icon
                            name="chatbubble-ellipses-outline"
                            size={20 * fs1px}
                            color={colors.textWhite}
                            style={{ marginRight: 6 }}
                        />
                        <Text style={[styles.newChatText, { fontSize: 15 * fs1px }]}>
                            Yeni Sohbet
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.userInfo}>
                    <Icon
                        name="person-circle-outline"
                        size={24 * fs1px}
                        color={colors.textWhite}
                    />
                    <Text style={[styles.userText, { fontSize: 16 * fs1px, marginLeft: 6 * w1px }]}>
                        {user?.name}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    newChatButton: {
        backgroundColor: colors.backgroundPrupleDark,
    },
    newChatContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newChatText: {
        fontWeight: '600',
        color: colors.textWhite,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userText: {
        fontWeight: '600',
        color: colors.textWhite,
    },
});

export default TopBar;
