import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import CheckGPSScreen from '../screens/CheckGPSScreen';
import MapScreen from '../screens/MapScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStack} from './NativeStack';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarColor: '#fff',
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name="home-outline" size={25} color="black" />
          ),
        }}
        name="Home"
        component={NativeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name="trophy-outline" size={25} color="black" />
          ),
        }}
        name="Run"
        component={CheckGPSScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name="people-outline" size={25} color="black" />
          ),
        }}
        name="Club"
        component={CheckGPSScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name="bar-chart-outline" size={25} color="black" />
          ),
        }}
        name="Activity"
        component={CheckGPSScreen}
      />
    </Tab.Navigator>
  );
};
