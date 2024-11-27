import mongoose, { Model } from "mongoose";

import "../model/Ride";
import { Driver } from "../model/Ride";
import { BaseDatabase } from "./BaseDatabase";
import { initializeDrivers } from "../util/Drivers";
import { CustomError } from "../errors/customErrors";

export class RidesDatabase extends BaseDatabase {
    private static initialDrivers: Model<any>;

    static {
        if (!RidesDatabase.initialDrivers) {
            RidesDatabase.initialDrivers = mongoose.model('Driver');
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
}