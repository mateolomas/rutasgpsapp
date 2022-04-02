import React from 'react';
import {View, Text, Button} from 'react-native';
import {useStopwatch} from 'react-timer-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

//BOTTOM TAB Props extends

const TripScreen = () => {
  const [trips, setTrips] = React.useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('trip');

      jsonValue != null ? setTrips(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const getAllKeys = async () => {
    let keys: any = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      setTrips(keys);
    } catch (e) {
      console.log(e);
    }
    console.log(keys);
  };

  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Trips</Text>

      <Button title="Load Data" onPress={getAllKeys} />
      <Text>{JSON.stringify(trips)}</Text>
    </View>
  );
};

export default TripScreen;
