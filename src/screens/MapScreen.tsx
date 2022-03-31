import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MapView from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Map} from '../components/Map';
import MapButtons from '../components/MapButtons';
import HeaderMap from '../components/HeaderMap';
import Cards from '../components/Cards';

const MapScreen = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{flex: 1}}>
      <HeaderMap />

      <Map />

      <MapButtons />
    </View>
  );
};

export default MapScreen;
