import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {LocationContext} from '../../context/LocationContext';
import {getAllTrips} from '../../lib/storageTrip';
import {TotalTrip} from '../../interfaces/appInterfaces';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/TripsInfoStack';

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
                <Text>Time: </Text>
                {trip.minutes === 0 && trip.seconds === 0 ? null : (
                  <Text>
                    {trip.minutes}:{' '}
                    {trip.seconds < 10 ? `0${trip.seconds}` : trip.seconds}
                  </Text>
                )}
                <Text>
                  Distance: {Math.round(trip.distance * 100) / 100} Km
                </Text>
                <Text>Date: {trip.date!}</Text>
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
    width: '90%',
    padding: 10,
    height: 100,
    marginVertical: 8,
    marginTop: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 6.3,
    marginHorizontal: 20,
    elevation: 13,
  },
  tripText: {
    fontSize: 20,
  },
});

export default TripScreen;
