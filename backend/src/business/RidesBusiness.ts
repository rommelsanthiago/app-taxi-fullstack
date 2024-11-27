import RideService from "../services/RideService";
import { RidesRepository } from "./RidesRepository";
import { CustomError, InvalidData, SameData } from "../errors/customErrors";
import { Estimates } from "../model/Ride";

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

            const estimate = await RideService.calculateEstimate({ customer_id, origin, destination });
            
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
                error.error_code,
                error.description, 
                error.error_description
            );
        }
    }
};
