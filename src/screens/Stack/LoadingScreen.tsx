import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{marginVertical: 20, fontSize: 18}}>
        Loading map, wait a momement please...
      </Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default LoadingScreen;
