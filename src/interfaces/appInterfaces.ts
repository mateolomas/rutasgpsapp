export interface Location {
    latitude: number
    longitude: number
    altitude?: Number,
    timestamp?: Number, //Milliseconds since Unix epoch
    accuracy?: Number,
    altitudeAccuracy?: Number,
    speed?: Number,
}

