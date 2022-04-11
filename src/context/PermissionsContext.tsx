import React, {useEffect} from 'react';
import {createContext} from 'react';
import {AppState, Platform} from 'react-native';
import {
  PermissionStatus,
  check,
  request,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

export interface PermissionsContextProps {
  locationStatus: PermissionStatus;
}

export const permissionInitialState: PermissionsContextProps = {
  locationStatus: 'unavailable',
};

type PermissionContextType = {
  permissions: PermissionsContextProps;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionContextType);

//provider
export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = React.useState(permissionInitialState);

  useEffect(() => {
    checkLocationPermission();
    AppState.addEventListener('change', state => {
      if (state !== 'active') {
        return;
      }
      checkLocationPermission();
    });
  });

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    if (permissionStatus === 'blocked') {
      openSettings();
    }

    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
