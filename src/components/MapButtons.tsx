import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MapButtons = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        left: 70,
      }}>
      <TouchableOpacity onPress={() => {}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 50,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="md-settings" size={25} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('DistanceScreen')}>
        <View
          style={{
            backgroundColor: 'purple',
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 30,
            height: 70,
            top: -20,
            borderRadius: 50,
          }}>
          <Text style={{color: 'white'}}>Start</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 50,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="musical-notes-outline" size={25} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MapButtons;
