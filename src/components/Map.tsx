import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {Location} from '../interfaces/appInterfaces';
import LoadingScreen from '../screens/Stack/LoadingScreen';
import Fab from './Fab';

interface Props {
  markers?: Marker[];
  coords: Location;
  polyline?: Location[];
  showUserLocation?: boolean;
}

export const Map = ({
  markers,
  coords,
  polyline,
  showUserLocation = true,
}: Props) => {
  const [showPolyline, setShowPolyline] = useState(true);

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;

    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();

    following.current = true;

    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        //provider={PROVIDER_GOOGLE}
        loadingEnabled
        showsUserLocation={showUserLocation}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.00510421,
        }}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0001922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={polyline!}
            strokeColor="black"
            strokeWidth={3}
          />
        )}

        {/*  <Marker
          image={require('../assets/images/marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Esto es un título"
          description="Esto es una descripción del marcador"
        /> */}
      </MapView>

      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 250,
          left: 20,
        }}
      />

      {/*   <Fab
        iconName="brush-outline"
        onPress={() => {
          setShowPolyline(!showPolyline);
          console.log('pressed');
        }}
        style={{
          position: 'absolute',
          bottom: 120,
          right: 20,
        }}
      /> */}
    </>
  );
};
