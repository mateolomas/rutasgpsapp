import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

import {Map} from '../../components/Map';
import {LocationContext} from '../../context/LocationContext';
import {getAllTrips} from '../../lib/storageTrip';
import {RouteInfo, TotalTrip} from '../../interfaces/appInterfaces';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/TripsInfoStack';

import MapView from 'react-native-maps';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'TripScreen'> {}

const TripScreen = ({navigation}: Props) => {
  const {userLocation} = useContext(LocationContext);
  const [tripInfo, setTripInfo] = React.useState<TotalTrip>({
    distance: 0,
    routeList: [userLocation],
    minutes: 0,
    seconds: 0,
    hours: 0,
  });

  const [trips, setTrips] = React.useState<TotalTrip[]>([tripInfo]);

  const getTrip = async () => {
    const trips = await getAllTrips();
    setTrips(trips);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const response = await getTrip();
      return response;
    });

    return unsubscribe;
  }, [navigation]);
  console.log('trips', trips);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Trips</Text>
      </View>
      <ScrollView style={{width: '100%'}}>
        {trips &&
          trips.map((trip, index) => (
            <TouchableOpacity
              style={styles.trip}
              key={index}
              onPress={() => {
                setTripInfo(trip);
                navigation.navigate('TripsInfoScreen', trip);
              }}>
              <View
                style={{
                  marginVertical: 0,
                }}>
                <Text style={styles.tripText}>Id: {index}</Text>
                <Text>
                  Time: {trip.hours}: {trip.minutes}:{trip.seconds}
                </Text>
                <Text>Distance: {trip.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
  },

  titleContainer: {
    margin: 20,
    backgroundColor: 'white',
    top: 50,
    height: 120,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  trip: {
    width: '100%',

    padding: 10,
    height: 100,
    borderTopWidth: 1,
    marginVertical: 8,
    borderBottomWidth: 1,
  },
  tripText: {
    fontSize: 20,
  },
});

export default TripScreen;
