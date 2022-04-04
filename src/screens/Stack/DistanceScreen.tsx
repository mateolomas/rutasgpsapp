import React, {useContext, useState, useRef, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocationContext} from '../../context/LocationContext';
import {getDistanceFromLatLonInKm} from '../../helpers/Distance';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/NativeStack';
import {Location} from '../../interfaces/appInterfaces';
import Geolocation from '@react-native-community/geolocation';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'DistanceScreen'> {}

const DistanceScreen = ({navigation}: Props) => {
  const {
    seconds,
    minutes,
    pause,
    userLocation,
    getCurrentLocation,
    stopFollowUserLocation,
  } = useContext(LocationContext);

  const [initialPosition, setInitialPosition] =
    useState<Location>(userLocation);
  const [finalPosition, setFinalPosition] = useState<Location>(userLocation);
  const [routeline, setRouteLines] = useState<Location[]>([]);

  useEffect(() => {
    getCurrentLocation()
      .then((location: Location) => {
        setFinalPosition(location);
        console.log('USEEFFECT1', location);
      })
      .catch((err: any) => {
        console.log(err, 'error');
      });
  }, [finalPosition]);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, [finalPosition]);

  const isMounted = useRef(true);
  const watchId = useRef<number>();

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) return;

        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setRouteLines(routes => [...routes, location]);
      },
      err => console.log(err),
      {enableHighAccuracy: true, distanceFilter: 1},
    );
  };

  const distance = getDistanceFromLatLonInKm(
    initialPosition.latitude,
    initialPosition.longitude,
    finalPosition.latitude,
    finalPosition.longitude,
  );

  console.log('distance: ', distance);
  console.log('initialPosition: ', initialPosition);
  console.log('finalPosition: ', finalPosition);
  console.log('route lines: ', routeline);

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
      </View>

      <TouchableOpacity
        style={styles.pauseButton}
        onPress={() => {
          pause();
          setFinalPosition(finalPosition);
          navigation.navigate('RouteScreen', {
            finalPosition,
            routeline,
            distance,
          });
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
