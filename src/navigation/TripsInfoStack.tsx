import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TripScreen from '../screens/BottomTabs/TripScreen';
import TripsInfoScreen from '../screens/BottomTabs/TripsInfoScreen';
import {TotalTrip} from '../interfaces/appInterfaces';

export type RootStackParamList = {
  TripsInfoScreen: TotalTrip;
  TripScreen: undefined;
};

const Stack = createNativeStackNavigator();

export const TripInfoStack = ({navigation, route}: any) => {
  return (
    <Stack.Navigator
      initialRouteName="TripScreen"
      screenOptions={{
        presentation: 'fullScreenModal',
        //presentation: 'modal',
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
