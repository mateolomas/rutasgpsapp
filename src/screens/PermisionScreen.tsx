import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import {PermissionsContext} from '../context/PermissionsContext';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

const PermisionScreen = () => {
  const {askLocationPermission, permissions} =
    React.useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text>PermisionScreen</Text>
      <Button title="Check Permision" onPress={askLocationPermission} />
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
});

export default PermisionScreen;
