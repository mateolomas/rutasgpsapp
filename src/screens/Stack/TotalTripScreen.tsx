import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Map} from '../../components/Map';
import {LocationContext} from '../../context/LocationContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/NativeStack';
import {saveTrip} from '../../lib/storageTrip';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'TotalTripScreen'> {}

const TotalTripScreen = ({route, navigation}: Props) => {
  const trip = route.params;

  const {pause, reset} = useContext(LocationContext);

  //saving to local storage
  const saveToLocalStorage = async () => {
    await saveTrip(trip);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        top: 20,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          left: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          marginVertical: 10,
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 26,
          }}>
          Thursday Afternoon Run
        </Text>
        <Icon name="pencil-outline" size={30} color="black" />
      </View>

      <View
        style={{
          left: 25,
        }}>
        <Text
          style={{
            fontSize: 90,
            textAlign: 'left',
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          {Math.round(Number(trip.distance) * 100) / 100}
        </Text>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'left',
            fontWeight: '200',
          }}>
          Kilometers
        </Text>
      </View>

      <View>
        <View>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  bottom: 10,
                }}>
                {trip.minutes === 0 && trip.seconds === 0 ? null : (
                  <Text>
                    {trip.minutes}:{' '}
                    {trip.seconds < 10 ? `0${trip.seconds}` : trip.seconds}
                  </Text>
                )}
              </Text>
              <Text
                style={{
                  fontWeight: '200',
                }}>
                Time
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{height: 390}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => {
              saveToLocalStorage();
              pause();
              reset();
              navigation.navigate('HomeScreen');
            }}>
            <View style={styles.buttonBlue}>
              <Text>Save trip</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              pause();
              reset();
              navigation.popToTop();
            }}>
            <View style={styles.buttonRed}>
              <Text>Delete trip</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Map
          showUserLocation={false}
          coords={trip.routeList[0]}
          polyline={trip.routeList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBlue: {
    backgroundColor: '#01bfff',
    borderRadius: 10,
    padding: 10,
    margin: 20,
  },
  buttonRed: {
    backgroundColor: '#ff0000',
    borderRadius: 10,
    padding: 10,
    margin: 20,
  },
});

export default TotalTripScreen;
