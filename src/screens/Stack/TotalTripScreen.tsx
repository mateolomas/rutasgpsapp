import React, {useContext} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Map} from '../../components/Map';
import {LocationContext} from '../../context/LocationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/NativeStack';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'TotalTripScreen'> {}

const TotalTripScreen = ({route}: Props) => {
  const trip = route.params;
  console.log(trip, 'tripparam');

  const navigation = useNavigation();
  const {seconds, start, minutes, hours, pause, reset, routelines} =
    useContext(LocationContext);

  const LocationInfo = useContext(LocationContext);
  console.log(LocationInfo, 'location Info');
  //saving to local storage
  const saveToLocalStorage = () => {
    const trip = {
      seconds,
      minutes,
      hours,
      days: 0,
      routelines,
    };
    try {
      AsyncStorage.setItem('trip', JSON.stringify(trip));
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
          0.07
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

      <View>
        <Button
          title="Save Trip"
          onPress={() => {
            saveToLocalStorage();
            pause();
            reset();
            navigation.navigate('HomeScreen');
          }}
        />
        <Button title="Delete Trip" />
        <ScrollView>
          <View style={{left: 50}}>
            <Text>{JSON.stringify(minutes)} minutes</Text>
            <Text>{JSON.stringify(seconds)} seconds</Text>
            <Text>{JSON.stringify(hours)} hours</Text>
            <Text>{JSON.stringify(routelines)}</Text>
            <Text>{JSON.stringify(LocationInfo)}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TotalTripScreen;
