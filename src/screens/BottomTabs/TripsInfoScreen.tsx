import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trip Details</Text>
        <Text style={styles.distance}>
          Distance: {Math.round(distance * 100) / 100} Km
        </Text>
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

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    top: 20,
    width: '100%',
  },
  title: {
    fontSize: 35,
  },
  distance: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginTop: 10,
    marginHorizontal: 25,
  },
});

export default TripsInfoScreen;
