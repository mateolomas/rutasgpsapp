import React, {useEffect} from 'react';
import {View, Text, Button, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStotage} from '../../hooks/useStorage';

const TripScreen = () => {
  const {
    trips,
    tripInfo,
    getAllKeys,
    getMyData,
    logCurrentStorage,
    removeMyData,
  } = useStotage();

  useEffect(() => {
    getAllKeys();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Trips</Text>

      {/* <Button title="Load Data" onPress={getAllKeys} />
      <Text>{JSON.stringify(trips)}</Text>
      <Button title="Load myData" onPress={logCurrentStorage} />
      <Button title="Erase myData" onPress={removeMyData} /> */}
      <ScrollView>
        {trips &&
          trips.map((trip, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                getMyData(trip);
              }}>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: 'grey',
                  marginVertical: 5,
                }}>
                <Text>{trip}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Text>{JSON.stringify(tripInfo)}</Text>
    </View>
  );
};

export default TripScreen;
