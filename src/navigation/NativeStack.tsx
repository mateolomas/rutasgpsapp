import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PermisionScreen from '../screens/Stack/PermisionScreen';
import LoadingScreen from '../screens/Stack/LoadingScreen';
import {PermissionsContext} from '../context/PermissionsContext';
import DistanceScreen from '../screens/Stack/DistanceScreen';
import RouteScreen from '../screens/Stack/RouteScreen';
import TotalTripScreen from '../screens/Stack/TotalTripScreen';
import HomeScreen from '../screens/Stack/HomeScreen';
import {Location, RouteInfo, TotalTrip} from '../interfaces/appInterfaces';

export type RootStackParamList = {
  HomeScreen: undefined;
  PermisionScreen: undefined;
  LoadingScreen: undefined;
  DistanceScreen: Location;
  RouteScreen: RouteInfo;
  TotalTripScreen: TotalTrip;
};

const Stack = createStackNavigator();

export const NativeStack = ({navigation, route}: any) => {
  const {permissions} = useContext(PermissionsContext);
  /* if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  } */

  return (
    <Stack.Navigator
      initialRouteName="PermisionScreen"
      screenOptions={{
        /* presentation: 'fullScreenModal', */
        presentation: 'modal',
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={HomeScreen}
        />
      ) : (
        <Stack.Screen
          options={{headerShown: false}}
          name="PermisionScreen"
          component={PermisionScreen}
        />
      )}

      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DistanceScreen"
        component={DistanceScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="RouteScreen"
        component={RouteScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TotalTripScreen"
        component={TotalTripScreen}
      />
    </Stack.Navigator>
  );
};

//

//AIzaSyDc9rBjIfJHbn0AZDo-zqdAg3foGyK7n8Y
