import React from 'react';
import {ScrollView, View, Image, Text} from 'react-native';

const Cards = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{}}>
      {/* <View
        style={{
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
            width: '30%',
            height: '80%',
            borderRadius: 10,
            marginHorizontal: 10,
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: '100',
            }}>
            Try a guided run
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            Third Run
          </Text>
          <Text
            style={{
              fontWeight: '100',
            }}>
            25 min - Run
          </Text>
        </View>
      </View> */}
    </ScrollView>
  );
};

export default Cards;