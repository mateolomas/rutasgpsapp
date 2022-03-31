import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLocation} from '../hooks/useLocation';
import {useEffect} from 'react';
import {useState} from 'react';
import {Location} from '../interfaces/appInterfaces';
import {Stopwatch} from 'react-native-stopwatch-timer';
import {LocationContext} from '../context/LocationContext';

const DistanceScreen = () => {
  const navigation = useNavigation();

  const {initialPosition, getCurrentLocation, userLocation} = useLocation();

  const [positionWhenPlay, setPositionWhenPlay] = useState<Location>({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
  });

  const [positionWhenPause, setPositionWhenPause] = useState<Location>({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
  });

  /**timer */
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const Location = useContext(LocationContext);

  console.log(Location, 'locationcontext');

  return (
    <View
      style={{
        backgroundColor: 'yellow',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 50,
          width: '100%',
          justifyContent: 'space-evenly',
        }}>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              bottom: 10,
            }}>
            <Stopwatch
              start={isTimerStart}
              reset={resetTimer}
              options={options}
              getTime={(time: any) => setElapsedTime(time)}
            />
            <TouchableHighlight
              onPress={() => {
                setIsTimerStart(!isTimerStart);
                setResetTimer(false);
              }}>
              <Text style={styles.buttonText}>
                {!isTimerStart ? 'START' : 'STOP'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                setIsTimerStart(false);
                setResetTimer(true);
              }}>
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableHighlight>
          </Text>
          <Text
            style={{
              fontWeight: '200',
            }}>
            Time
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 100,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          0.00
        </Text>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: '200',
          }}>
          Kilometers
          {JSON.stringify(userLocation)}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 80,
        }}
        onPress={() => navigation.navigate('RouteScreen')}>
        <View
          style={{
            backgroundColor: 'black',
            borderRadius: 100,
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="md-pause" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

const options = {
  container: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};

export default DistanceScreen;
