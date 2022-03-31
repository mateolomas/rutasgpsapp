import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStack} from './src/navigation/NativeStack';
import {PermissionsProvider} from './src/context/PermissionsContext';
import {BottomTabs} from './src/navigation/BottomTabs';

const AppState = ({children}: any) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        {/* <NativeStack /> */}
        <BottomTabs />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
