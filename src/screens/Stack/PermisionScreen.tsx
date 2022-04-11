import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PermissionsContext} from '../../context/PermissionsContext';

const PermisionScreen = () => {
  const {askLocationPermission, permissions} =
    React.useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text>Enable Location Services in order the app to work...</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => askLocationPermission()}>
        <Text>Ask Permission</Text>
      </TouchableOpacity>

      <Text>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10,
  },
});

export default PermisionScreen;
