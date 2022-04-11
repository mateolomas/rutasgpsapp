import {Location} from '../interfaces/appInterfaces';

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const getDistanceFromArray = (routelines: Location[]) => {
  let distance = 0;
  for (let i = 0; i < routelines.length - 1; i++) {
    const lat1 = routelines[i].latitude;
    const lon1 = routelines[i].longitude;
    const lat2 = routelines[i + 1].latitude;
    const lon2 = routelines[i + 1].longitude;
    distance += getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  }
  return distance;
};
