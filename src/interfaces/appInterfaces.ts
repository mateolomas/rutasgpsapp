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
    distance: number,
}

export interface TotalTrip {
    routeId?: string,
    initialPosition?: Location,
    finalPosition?: Location,
    routeList: Location[],
    distance: number,
    seconds: Number,
    minutes: Number,
    hours: Number,
    
}