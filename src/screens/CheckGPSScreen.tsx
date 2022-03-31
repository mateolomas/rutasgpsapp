import React from 'react';
import {View, Text} from 'react-native';
import LocationEnabler from 'react-native-location-enabler';
/* 
const {
  PRIORITIES: {HIGH_ACCURACY},
  useLocationSettings,
} = LocationEnabler; */

const CheckGPSScreen = () => {
  const active = true;

  //check GPS status

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>El GPS esta: {active}</Text>
    </View>
  );
};

export default CheckGPSScreen;
