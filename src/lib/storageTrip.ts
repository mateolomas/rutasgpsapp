import AsyncStorage from '@react-native-async-storage/async-storage';
import { TotalTrip } from '../interfaces/appInterfaces';
export const getAllTrips = async ():Promise<TotalTrip[]> => {
    const jsonValue = await AsyncStorage.getItem('trip');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  };

export const saveTrip = async (trip: TotalTrip): Promise<void> => {
    const trips = await getAllTrips(); //get with key "trip"
    trips.push(trip);
    AsyncStorage.setItem('trip', JSON.stringify(trips));

}

