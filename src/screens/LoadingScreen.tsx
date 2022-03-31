import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: -20,
      }}>
      <Text>Cargando...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
