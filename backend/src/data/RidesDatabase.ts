import mongoose, { Model } from "mongoose";

import "../model/Ride";
import { Driver, Ride } from "../model/Ride";
import { BaseDatabase } from "./BaseDatabase";
import { initializeDrivers } from "../util/Drivers";
import { CustomError } from "../errors/customErrors";

export class RidesDatabase extends BaseDatabase {
    private static initialDrivers: Model<any>;
    private static ride: Model<any>;

    static {
        if (!RidesDatabase.initialDrivers) {
            RidesDatabase.initialDrivers = mongoose.model('Driver');
            RidesDatabase.ride = mongoose.model('Ride');
            initializeDrivers();
        }
    }

    public async getDrivers(distance: number): Promise<Driver[]> {
        try {
            await RidesDatabase.connection;
            const drivers = await RidesDatabase.initialDrivers.aggregate([
                { $match: { minKm: { $lte: distance } } },

                {
                    $project: {
                        id: "$id",
                        name: "$name",
                        description: "$description",
                        vehicle: "$vehicle",
                        review: {
                            rating: "$rating",
                            comment: "$reviewComment",
                        },
                        value: { $multiply: ["$ratePerKm", distance] },
                    },
                },

                { $sort: { value: 1 } },
            ])
            
            return drivers;
        } catch (error: any) {
            throw new CustomError(
                error.error_code,
                error.message, 
                error.error_description
            );
        }
    }

    public async findDriverById(id: number): Promise<Driver> {
        try {
            await RidesDatabase.connection;
            const driver = await RidesDatabase.initialDrivers.findOne({id: id});

            return driver;
        } catch (error: any) {
            throw new CustomError(
                error.error_code,
                error.message, 
                error.error_description
            );
        }
    }

    public async saveRide(ride: Ride): Promise<void> {
        try {
            await RidesDatabase.connection;
            await RidesDatabase.ride.create(ride);
        } catch (error: any) {
            throw new CustomError(
                error.error_code,
                error.message,
                error.error_description
            )
        }
    }
}