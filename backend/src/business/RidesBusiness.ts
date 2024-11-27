import RideService from "../services/RideService";
import { RidesRepository } from "./RidesRepository";
import { CustomError, DriverNotFound, InvalidData, InvalidDistance, InvalidDriver, RidesNotFound, SameData } from "../errors/customErrors";
import { Estimates, Ride, RideConfirmInput } from "../model/Ride";

export class RidesBusiness {
    constructor(
        private ridesDatabase: RidesRepository,
    ){}

    public estimate = async (customer_id: string, origin: string, destination: string) => {
        try {
            if(!customer_id || !origin || !destination) {
                throw new InvalidData();
            }

            if(origin === destination) {
                throw new SameData();
            }

            const estimate = await RideService.calculateEstimate({ origin, destination });
            
            const drivers = await this.ridesDatabase.getDrivers(estimate.distance);

            const estimates: Estimates = {
                origin: {
                    latitude: estimate.origin.lat,
                    longitude: estimate.origin.lng,
                },
                destination: {
                    latitude: estimate.destination.lat,
                    longitude: estimate.destination.lng,
                },
                distance: estimate.distance,
                duration: estimate.duration,
                options: drivers,
                routeResponse: {
                    geocoded_waypoints: [estimate.routeResponse.geocoded_waypoints],
                    routes: [estimate.routeResponse.routes],
                    status: estimate.routeResponse.status
                }
            }

            return estimates;
        } catch (error: any) {
            console.error(error);
            throw new CustomError (
                error.status_code,
                error.error_code,
                error.description, 
                error.error_description
            );
        }
    }

    public confirmRide = async (input: RideConfirmInput) => {
        try {
            const { customer_id, origin, destination, driver, distance, duration, value } = input;

            if (!customer_id || !origin || !destination || !driver || !distance || !duration || !value) {
                throw new InvalidData();
            }

            if (origin === destination) {
                throw new SameData();
            }

            const validDriver = await this.ridesDatabase.findDriverById(driver.id);

            if (!validDriver) {
                throw new DriverNotFound();
            };

            if (distance < validDriver.minKm) {
                throw new InvalidDistance();
            };

            const ride: Ride = {
                customer_id,
                origin,
                destination,
                driver: {
                    id: driver.id,
                    name: driver.name,
                },
                distance,
                value,
                duration
            };

            await this.ridesDatabase.saveRide(ride);            
        } catch (error: any) {
            throw new CustomError (
                error.status_code,
                error.error_code,
                error.description, 
                error.error_description
            );   
        }
    }

    public findRides = async (customer_id: string, driver_id?: number) => {
        try {
            if(!customer_id) {
                throw new InvalidData();
            }

            let rides;

            if(driver_id) {
                const driver = await this.ridesDatabase.findDriverById(driver_id);
                
                if(!driver) {
                    throw new InvalidDriver();
                }

                rides = await this.ridesDatabase.findRidesByUser(customer_id, driver_id);
                
                if(rides.length === 0) {
                    throw new RidesNotFound();
                }

                return rides;
            }

            rides = await this.ridesDatabase.findRidesByUser(customer_id);
            
            if(rides.length === 0) {
                throw new RidesNotFound();
            }

            return rides;
        } catch (error: any) {
            throw new CustomError (
                error.status_code,
                error.error_code,
                error.description, 
                error.error_description
            );   
        }
    }
};
