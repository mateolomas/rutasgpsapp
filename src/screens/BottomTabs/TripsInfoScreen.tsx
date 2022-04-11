import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Map} from '../../components/Map';
import {RootStackParamList} from '../../navigation/TripsInfoStack';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'TripsInfoScreen'> {}

const TripsInfoScreen = ({route, navigation}: Props) => {
  const routeList = route.params.routeList;
  const distance = route.params.distance;
  const date = route.params.date;
  const time = route.params.minutes + ':' + route.params.seconds;

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trip Details</Text>
        <Text style={styles.distance}>
          Distance: {Math.round(distance * 100) / 100} Km
        </Text>
        <Text style={styles.distance}>Date: {date!}</Text>
        <Text style={styles.distance}>Time: {time}</Text>
      </View>

      <Map
        coords={routeList[routeList.length - 1]}
        markers={routeList}
        showUserLocation={false}
        polyline={routeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    top: 20,
    width: '100%',
  },
  title: {
    fontSize: 35,
  },
  distance: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginTop: 10,
    marginHorizontal: 25,
  },
  button: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
});

export default TripsInfoScreen;
