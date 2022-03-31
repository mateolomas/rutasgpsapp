import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Cards from './Cards';

const HeaderMap = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',

          height: 30,
          marginHorizontal: 20,
          top: top + 10,
        }}>
        <Icon name="ios-arrow-back" size={30} color="black" />
        <View>
          <Text>Run</Text>
        </View>
        <Icon name="ios-settings" size={30} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 150,
          top: 30,
        }}>
        <View
          style={{
            width: '100%',
          }}>
          <Text
            style={{
              left: 50,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Run
          </Text>
          <View
            style={{
              flexDirection: 'row',
              height: 30,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text>Start a run </Text>
            <Text>Guided Runs</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderMap;
