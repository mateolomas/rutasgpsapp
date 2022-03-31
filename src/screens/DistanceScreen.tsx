import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DistanceScreen = () => {
  const navigation = useNavigation();

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

export default DistanceScreen;
