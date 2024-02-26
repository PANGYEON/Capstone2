import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import BoardScreen from './BoardScreen';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import RegisterScreen from './RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';



const MaterialBottomTabs =
  createMaterialBottomTabNavigator();

export default function MaterialBottomTabsScreen() {
  return (
    <NavigationContainer>
    <MaterialBottomTabs.Navigator barStyle={styles.tabBar}>
      <MaterialBottomTabs.Screen
        name="TabStack"
        component={MainScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: 'home',
          tabBarColor: '#C9E7F8',
        }}
      >
      </MaterialBottomTabs.Screen>
      <MaterialBottomTabs.Screen
        name="TabChat"
        component={BoardScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: 'message-reply',
          tabBarColor: '#9FD5C9',
          //tabBarBadge: true,
        }}
      />      
      <MaterialBottomTabs.Screen
        name="TabAlbums"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: 'heart',
          tabBarColor: '#FAD4D6',
        }}
      />
      <MaterialBottomTabs.Screen
        name="TabContacts"
        component={BoardScreen}
        options={{
          tabBarLabel: 'MyPage',
          tabBarIcon: 'contacts',
          tabBarColor: '#F7EAA2',
        }}
      />
    </MaterialBottomTabs.Navigator></NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
  },
});
