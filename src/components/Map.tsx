import React, {useContext, useEffect, useRef} from 'react';
import {Dimensions, Platform, View} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
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
  let {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = zoom;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const {
    hasLocation,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
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
    if (!following.current) {
      return;
    }
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
        provider={PROVIDER_GOOGLE}
        style={{flex: 2}}
        loadingEnabled
        showsUserLocation={showUserLocation}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onTouchStart={() => (following.current = false)}>
        {polyline && (
          <Polyline
            coordinates={polyline!}
            strokeColor="black"
            strokeWidth={5}
            lineJoin="round"
            strokeColors={[
              '#7F0000',
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

      {/* {Platform.OS === 'ios' ? (
        <Fab
          iconName="compass-outline"
          onPress={centerPosition}
          style={{
            position: 'absolute',
            left: -120,
            bottom: 190,
          }}
        />
      ) : null} */}
    </>
  );
};
