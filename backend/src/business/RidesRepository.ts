import { Driver } from '../model/Ride';

export interface RidesRepository {
    getDrivers(distance: number): Promise<Driver[]>   
}