export interface Location {
  latitude: number;
  longitude: number;
  altitude?: number;
  timestamp?: number; //Milliseconds since Unix epoch
  accuracy?: number;
  altitudeAccuracy?: number;
  speed?: number;
}

export interface RouteInfo {
  routeId?: Location;
  initialPosition?: Location;
  finalPosition?: Location;
  routeline: Location[];
  distance: number;
}

export interface TotalTrip {
  routeId?: string;
  initialPosition?: Location;
  finalPosition?: Location;
  routeList: Location[];
  distance: number;
  seconds: Number;
  minutes: Number;
  hours: Number;
  date?: string;
}
