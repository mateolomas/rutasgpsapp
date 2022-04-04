import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLocation} from '../hooks/useLocation';
import {Location} from '../interfaces/appInterfaces';
import LoadingScreen from '../screens/Stack/LoadingScreen';
import Fab from './Fab';
import {LocationContext} from '../context/LocationContext';

interface Props {
  markers?: Location[];
  coords: Location;
  polyline?: Location[];
  showUserLocation?: boolean;
  isMarker?: boolean;
  zoom?: number;
}

export const Map = ({
  markers,
  coords,
  polyline,

  showUserLocation = true,
  zoom = 0.009,
}: Props) => {
  const [showPolyline, setShowPolyline] = useState(true);

  let {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = zoom;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useContext(LocationContext);

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
    console.log('centerPosition', latitude, longitude);

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
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        showsUserLocation={showUserLocation}
        /* region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }} */
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={polyline!}
            strokeColor="black"
            strokeWidth={5}
            lineJoin="round"
            strokeColors={[
              '#7F0000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
          />
        )}

        {markers && (
          <>
            <Marker
              coordinate={{
                latitude: markers[0].latitude,
                longitude: markers[0].longitude,
              }}>
              <Icon name="flag" size={40} color="black" />
            </Marker>

            <Marker
              coordinate={{
                latitude: markers[markers.length - 1].latitude,
                longitude: markers[markers.length - 1].longitude,
              }}>
              <Icon name="golf" size={40} color="black" />
            </Marker>
          </>
        )}
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
