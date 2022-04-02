//Location context
import React from 'react';
import {createContext} from 'react';
import {useState, useEffect} from 'react';
import MapView from 'react-native-maps';

import {useLocation} from '../hooks/useLocation';
import {Location} from '../interfaces/appInterfaces';
import {useStopwatch} from 'react-timer-hook';

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
  const {
    initialPosition,
    hasLocation,
    routeLines,
    userLocation,
    stopFollowUserLocation,
    followUserLocation,
    getCurrentLocation,
  } = useLocation();

  const {seconds, minutes, hours, days, isRunning, start, pause, reset} =
    useStopwatch({autoStart: true});

  return (
    <LocationContext.Provider
      value={{
        followUserLocation,
        getCurrentLocation,
        stopFollowUserLocation,
        hasLocation,
        initialPosition,
        userLocation,
        routeLines,
        seconds,
        minutes,
        hours,
        start,
        pause,
        reset,
        isRunning,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
