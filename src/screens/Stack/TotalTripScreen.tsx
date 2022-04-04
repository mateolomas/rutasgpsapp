import React, {useContext} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Map} from '../../components/Map';
import {LocationContext} from '../../context/LocationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/NativeStack';
import Polyline from 'react-native-maps';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'TotalTripScreen'> {}

const TotalTripScreen = ({route, navigation}: Props) => {
  const trip = route.params;

  console.log(trip, 'tripparam');

  const {seconds, start, minutes, hours, pause, reset, routelines} =
    useContext(LocationContext);

  const ElementToSave = new Date().toString();

  //saving to local storage
  const saveToLocalStorage = () => {
    try {
      AsyncStorage.setItem(ElementToSave, JSON.stringify(trip));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',

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
          {Math.round(trip.distance * 100) / 100}
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
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  bottom: 10,
                }}>
                __
              </Text>
              <Text
                style={{
                  fontWeight: '200',
                }}>
                Pace
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  bottom: 10,
                }}>
                __
              </Text>
              <Text
                style={{
                  fontWeight: '200',
                }}>
                BPM
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  bottom: 10,
                }}>
                {trip.hours}:{trip.minutes}:{trip.seconds}
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

        <View>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  bottom: 10,
                }}>
                __
              </Text>
              <Text
                style={{
                  fontWeight: '200',
                }}>
                Pace
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  bottom: 10,
                }}>
                __
              </Text>
              <Text
                style={{
                  fontWeight: '200',
                }}>
                BPM
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  bottom: 10,
                }}>
                __
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

          <TouchableOpacity>
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
