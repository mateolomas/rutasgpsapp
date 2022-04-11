import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: top * 2,
        marginBottom: 10 * 2,
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
  );
};

export default Header;
