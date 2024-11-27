import { Driver, Ride } from '../model/Ride';

export interface RidesRepository {
    getDrivers(distance: number): Promise<Driver[]>
    findDriverById(id: number): Promise<Driver>   
    saveRide(ride: Ride): Promise<void>
}