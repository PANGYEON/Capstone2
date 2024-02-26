import React from 'react';
import { StyleSheet } from 'react-native';
import BoardScreen from './BoardScreen';
import ProfileScreen from './ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function Bottom_Navi({ navigation }) {

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#000000",
          inactiveTintColor: "#aaaaaa",
          style: {
            borderTopWidth: 0.5,
            borderTopColor: "#e9e9e9",
            backgroundColor: "#ffffff",
          },
          labelStyle: {
            marginBottom: 3,
            fontSize: 12,
          }
        }}
      >
        <Tab.Screen
          name="경매"
          component={BoardScreen}
          options={{
            headerShown: false,
            tabBarLabel: "홈",
            tabBarIcon: ({ focused }) =>
              focused ?
                <Ionicons name="home" size={24} color="black" /> :
                <Ionicons name="home-outline" size={24} color="#aaaaaa" />
          }}
        />
        <Tab.Screen
          name="프로필"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarLabel: "프로필",
            tabBarIcon: ({ focused }) =>
              focused ?
                <Ionicons name="person" size={24} color="black" /> :
                <Ionicons name="person-outline" size={24} color="#aaaaaa" />
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
  },
});
