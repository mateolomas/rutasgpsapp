import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteInfo, TotalTrip} from '../interfaces/appInterfaces';
import {LocationContext} from '../context/LocationContext';

export const useStorage = () => {
  /* const {initialPosition} = useContext(LocationContext); */
  /*
  const [trips, setTrips] = React.useState<RouteInfo[]>([]);
  const [tripInfo, setTripInfo] = React.useState<TotalTrip>({
    distance: 0,
    routeList: [initialPosition],
    minutes: 0,
    seconds: 0,
    hours: 0,
  });
*/

  const getAllKeys = async () => {
    let keys: any = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log(e);
    }
    console.log(keys);
  };

  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
  const logCurrentStorage = () => {
    AsyncStorage.getAllKeys().then((keyArray: string[]) => {
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

  return {
    getAllKeys,
    removeMyData,
    logCurrentStorage,
  };
};
