import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Image, Text, Alert, ScrollView} from 'react-native';
import {TotalTrip} from '../interfaces/appInterfaces';
import {getAllTrips} from '../lib/storageTrip';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  isCard: boolean;
}

const Cards = ({navigation}: any) => {
  const [trip, setLastTrip] = useState<TotalTrip>();

  const getLastTrip = async () => {
    await getAllTrips()
      .then(res => {
        setLastTrip(res[res.length - 1]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLastTrip();
  }, [getLastTrip]);

  useFocusEffect(
    useCallback(() => {
      getLastTrip();
    }, []),
  );

  if (!trip) {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',

          alignItems: 'center',
          padding: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          There is no trips yet, try do one
        </Text>
      </View>
    );
  }

  return (
    <View>
      {trip && (
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View
            style={{
              marginTop: 20,
              height: 210,
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.39,
              shadowRadius: 8.3,
              marginHorizontal: 20,
              elevation: 13,
            }}>
            <Image
              source={require('../assets/images/runner.jpeg')}
              style={{
                width: 200,
                height: 180,
                borderRadius: 10,
                marginHorizontal: 10,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 180,
              }}>
              <Text
                style={{
                  fontWeight: '300',
                }}>
                Last Trip
              </Text>
              {/*    <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {lastTrip?.date?.substring(0, 10)}
              </Text>
              <Text>{lastTrip?.date?.substring(11, 16)}</Text>  */}

              {/* <Text>{Math.round(lastTrip!.distance * 100) / 100} Km</Text> */}
              <Text
                style={{
                  fontWeight: '400',
                }}>
                {trip.minutes === 0 && trip.seconds === 0 ? null : (
                  <Text>
                    {trip.minutes}:{' '}
                    {trip.seconds < 10 ? `0${trip.seconds}` : trip.seconds}
                  </Text>
                )}{' '}
                min
              </Text>
              <Text>{Math.round(trip.distance * 100) / 100} Km</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Cards;
