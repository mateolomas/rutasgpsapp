import React, {useContext} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Map} from '../../components/Map';
import {LocationContext} from '../../context/LocationContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/NativeStack';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {start, userLocation} = useContext(LocationContext);

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: top,
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
        <ScrollView horizontal>
          <View
            style={{
              marginTop: 20,
              height: 210,
              padding: 10,
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
              source={require('../../assets/images/runner.jpeg')}
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
                  fontWeight: '400',
                }}>
                25 min - Run
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <Map coords={userLocation} zoom={0.009} />

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

        <TouchableOpacity
          onPress={() => {
            start();
            navigation.navigate('DistanceScreen', userLocation);
          }}>
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
    </>
  );
};

export default HomeScreen;
