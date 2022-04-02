import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Button,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useEffect} from 'react';
import {LocationContext} from '../../context/LocationContext';
import {getDistanceFromLatLonInKm} from '../../helpers/Distance';

const DistanceScreen = () => {
  const navigation = useNavigation();

  const {
    seconds,
    start,
    minutes,
    hours,
    pause,
    stop,
    followUserLocation,
    userLocation,
    initialPosition,
    routelines,
  } = useContext(LocationContext);

  useEffect(() => {
    followUserLocation();
  }, []);
  ///

  const distance = getDistanceFromLatLonInKm(
    initialPosition.latitude,
    initialPosition.longitude,
    userLocation.latitude,
    userLocation.longitude,
  );

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <View>
          {minutes === 0 && seconds === 0 ? null : (
            <Text style={styles.statsText}>
              {minutes}: {seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          )}
          <Text style={styles.statsTime}>Time</Text>
        </View>
      </View>

      <View style={styles.distanceContainer}>
        <Text style={styles.distanceText}>
          {Math.round(distance * 100) / 100}
        </Text>
        <Text style={styles.distanceKm}>Kilometers</Text>
        <Text>{JSON.stringify(userLocation)}</Text>
        <Text>{JSON.stringify(initialPosition)}</Text>
      </View>

      <TouchableOpacity
        style={styles.pauseButton}
        onPress={() => {
          pause();
          navigation.navigate('RouteScreen', {routelines, distance});
        }}>
        <View style={styles.pauseIcon}>
          <Icon name="md-pause" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  statsText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  statsTime: {
    textAlign: 'center',
    fontWeight: '300',
  },
  pauseButton: {
    position: 'absolute',
    bottom: 80,
  },
  pauseIcon: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 100,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  distanceKm: {
    alignSelf: 'center',
    fontWeight: '200',
  },
});

export default DistanceScreen;
