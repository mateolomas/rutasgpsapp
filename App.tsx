import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStack} from './src/navigation/NativeStack';
import {PermissionsProvider} from './src/context/PermissionsContext';
import {BottomTabs} from './src/navigation/BottomTabs';
import {LocationProvider} from './src/context/LocationContext';

const AppState = ({children}: any) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <LocationProvider>
        <AppState>
          <BottomTabs />
        </AppState>
      </LocationProvider>
    </NavigationContainer>
  );
};

export default App;
