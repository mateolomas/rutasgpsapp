import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {Map} from '../../components/Map';
import {RootStackParamList} from '../../navigation/TripsInfoStack';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'TripsInfoScreen'> {}

const TripsInfoScreen = ({route}: Props) => {
  const finalPosition = route.params.finalPosition;
  const routeList = route.params.routeList;
  const distance = route.params.distance;

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Trip Details</Text>
        <Text>{}</Text>
      </View>
      <Map
        coords={routeList[routeList.length - 1]}
        markers={routeList}
        showUserLocation={false}
        polyline={routeList}
      />
    </View>
  );
};

export default TripsInfoScreen;
