import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../screen/chat';
import User from '../screen/user/User';
import History from '../screen/history';
import colors from '../theme/colors';
import { useResponsive } from '../utils/responsive';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { w1px, h1px, fs1px } = useResponsive();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Icon name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: colors.buttonPruple,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: h1px * 70,
          paddingTop: h1px * 8,
          alignItems: 'center'
        },

        tabBarLabelStyle: {
          fontSize: fs1px * 13,
          fontWeight: '500',
        },

        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      })}
    >
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
