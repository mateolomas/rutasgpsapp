import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Map} from '../../components/Map';
import {LocationContext} from '../../context/LocationContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/NativeStack';
import {Location, TotalTrip} from '../../interfaces/appInterfaces';
import {getAllTrips} from '../../lib/storageTrip';
import {set} from 'date-fns/esm';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../components/Header';
import MapButtons from '../../components/MapButtons';
import Cards from '../../components/Cards';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {start, userLocation, getCurrentLocation, stopFollowUserLocation} =
    useContext(LocationContext);

  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getCurrentLocation()
      .then((location: Location) => {
        setInitialPosition(location);
      })
      .catch((err: any) => {
        console.log(err, 'error');
      });
    return () => {
      stopFollowUserLocation();
    };
  }, [userLocation]);

  const removeData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header />

      <Cards />

      <Map coords={userLocation} zoom={0.009} />

      <MapButtons
        navigation={navigation}
        start={start}
        initialPosition={initialPosition}
      />
    </View>
  );
};

export default HomeScreen;
