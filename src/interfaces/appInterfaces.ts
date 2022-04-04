export interface Location {
    latitude: number
    longitude: number
    altitude?: Number,
    timestamp?: Number, //Milliseconds since Unix epoch
    accuracy?: Number,
    altitudeAccuracy?: Number,
    speed?: Number,
}


export interface RouteInfo {
    routeId?: Location,
    initialPosition?: Location,
    finalPosition?: Location,
    routeline: Location[],
    distance: Number,
}

export interface TotalTrip {
    routeId?: string,
    initialPosition?: Location,
    finalPosition?: Location,
    routeList: Location[],
    distance: Number,
    seconds: Number,
    minutes: Number,
    hours: Number,
    
}