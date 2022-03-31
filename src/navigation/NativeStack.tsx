import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';
import PermisionScreen from '../screens/PermisionScreen';
import LoadingScreen from '../screens/LoadingScreen';
import {PermissionsContext} from '../context/PermissionsContext';
import Mapscreen from '../screens/CheckGPSScreen';

const Stack = createNativeStackNavigator();

export const NativeStack = () => {
  const {permissions} = useContext(PermissionsContext);
  /*  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  } */

  return (
    <Stack.Navigator initialRouteName="PermisionScreen">
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="MapScreen"
          component={MapScreen}
        />
      ) : (
        <Stack.Screen name="PermisionScreen" component={PermisionScreen} />
      )}

      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

//

//AIzaSyDc9rBjIfJHbn0AZDo-zqdAg3foGyK7n8Y
