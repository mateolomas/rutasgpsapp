import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TripScreen from '../screens/BottomTabs/TripScreen';
import TripsInfoScreen from '../screens/BottomTabs/TripsInfoScreen';
import {TotalTrip} from '../interfaces/appInterfaces';

export type RootStackParamList = {
  TripsInfoScreen: TotalTrip;
  TripScreen: undefined;
};

const Stack = createStackNavigator();

export const TripInfoStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TripScreen"
      screenOptions={{
        //presentation: 'fullScreenModal',
        presentation: 'modal',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TripScreen"
        component={TripScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TripsInfoScreen"
        component={TripsInfoScreen}
      />
    </Stack.Navigator>
  );
};

//

//AIzaSyDc9rBjIfJHbn0AZDo-zqdAg3foGyK7n8Y
