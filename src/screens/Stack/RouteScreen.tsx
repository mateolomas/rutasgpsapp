import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Map} from '../../components/Map';
import {LocationContext} from '../../context/LocationContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/NativeStack';
import {format} from 'date-fns';

interface Props extends StackScreenProps<RootStackParamList, 'RouteScreen'> {}

const RouteScreen = ({route, navigation}: Props) => {
  const finalPosition = route.params.finalPosition!;
  const routeList = route.params.routeline;
  const distance = route.params.distance;
  const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

  const {
    seconds,
    start,
    minutes,
    hours,
    pause,
    reset,

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
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  bottom: 10,
                }}>
                {minutes === 0 && seconds === 0 ? null : (
                  <Text>
                    {minutes}: {seconds < 10 ? `0${seconds}` : seconds}
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
