import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const [trips, setTrips] = React.useState([]);
const [tripInfo, setTripInfo] = React.useState({});

export const getAllKeys = async () => {
  let keys: any = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    setTrips(keys);
  } catch (e) {
    console.log(e);
  }
  console.log(keys);
};

export const getMyData = async (trip: any) => {
  try {
    const jsonValue = await AsyncStorage.getItem(trip);
    jsonValue != null ? setTripInfo(JSON.parse(jsonValue)) : null;
  } catch (e) {
    console.log(e);
  }
};
// example console.log result:
// ['@MyApp_user', '@MyApp_key']
export const logCurrentStorage = () => {
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

export const removeMyData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

export {trips, tripInfo, setTripInfo, setTrips};
