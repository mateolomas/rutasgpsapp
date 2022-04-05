import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Map} from '../../components/Map';
import {LocationContext} from '../../context/LocationContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/NativeStack';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'RouteScreen'> {}

const RouteScreen = ({route, navigation}: Props) => {
  const finalPosition = route.params.finalPosition!;
  const routeList = route.params.routeline;
  const distance = route.params.distance;
  const date = new Date().toString();

  const {
    seconds,
    start,
    minutes,
    hours,
    pause,
    reset,
    hasLocation,
    stopFollowUserLocation,
  } = useContext(LocationContext);

  return (
    <>
      <Map
        coords={finalPosition}
        showUserLocation={false}
        polyline={routeList}
        markers={routeList}
      />

      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
                {Math.round(seconds / 2)}
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
                {1}
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
                {seconds}
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            bottom: -20,
            width: '100%',

            marginHorizontal: 50,
          }}>
          <TouchableOpacity
            onPress={() => {
              stopFollowUserLocation();
              navigation.navigate('TotalTripScreen', {
                seconds,
                minutes,
                hours,
                routeList,
                distance,
                date,
              });
              pause();
              reset();
              pause();
            }}>
            <View
              style={{
                backgroundColor: 'black',
                borderRadius: 100,
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="md-stop" size={30} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DistanceScreen', finalPosition!);
              start();
            }}
            style={{}}>
            <View
              style={{
                backgroundColor: 'purple',
                borderRadius: 100,
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="md-play" size={30} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default RouteScreen;
