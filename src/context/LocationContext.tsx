//Location context
import React from 'react';
import {createContext} from 'react';
import {useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {Location} from '../interfaces/appInterfaces';

type LocationContextType = {
  hasLocation: boolean;
  initialPosition: {latitude: number; longitude: number};
  userLocation: {latitude: number; longitude: number};
  routeLines: Location[];
  /*  getCurrentLocation: () => Promise<Location>;
    followUserLocation: () => void;
    stopFollowUserLocation: () => void;
    centerPosition: () => void;
    mapViewRef: React.RefObject<MapView>;
    following: React.RefObject<boolean>;
     */
};

export const LocationContext = createContext({} as any);

//provider

export const LocationProvider = ({children}: any) => {
  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Location[]>([]);

  const {initialPosition, userLocation, getCurrentLocation} = useLocation();

  return (
    <LocationContext.Provider
      value={{
        hasLocation,
        initialPosition,
        userLocation,
        routeLines,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
