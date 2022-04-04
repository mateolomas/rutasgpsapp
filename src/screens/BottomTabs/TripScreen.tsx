import React, {useEffect} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {useStopwatch} from 'react-timer-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

//BOTTOM TAB Props extends

const TripScreen = () => {
  const [trips, setTrips] = React.useState([]);
  const [tripInfo, setTripInfo] = React.useState({});

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

  const getMyData = async (trip: any) => {
    try {
      const jsonValue = await AsyncStorage.getItem(trip);
      jsonValue != null ? setTripInfo(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log(e);
    }
  };
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
  const logCurrentStorage = () => {
    AsyncStorage.getAllKeys().then(keyArray => {
      AsyncStorage.multiGet(keyArray).then(keyValArray => {
        let myStorage: any = {};
        for (let keyVal of keyValArray) {
          myStorage[keyVal[0]] = keyVal[1];
        }

        console.log('CURRENT STORAGE: ', myStorage);
      });
    });
  };

  const removeMyData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllKeys();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Trips</Text>

      {/* <Button title="Load Data" onPress={getAllKeys} />
      <Text>{JSON.stringify(trips)}</Text>
      <Button title="Load myData" onPress={logCurrentStorage} />
      <Button title="Erase myData" onPress={removeMyData} /> */}

      {trips &&
        trips.map((trip, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              getMyData(trip);
            }}>
            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: 'grey',
                marginVertical: 5,
              }}>
              <Text>{trip}</Text>
            </View>
          </TouchableOpacity>
        ))}
      <Text>{JSON.stringify(tripInfo)}</Text>
    </View>
  );
};

export default TripScreen;
