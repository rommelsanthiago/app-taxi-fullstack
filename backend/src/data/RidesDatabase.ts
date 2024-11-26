import mongoose, { Model } from "mongoose";

import "../model/Ride";
import { BaseDatabase } from "./BaseDatabase";
import { initializeDrivers } from "../util/Drivers";

export class RidesDatabase extends BaseDatabase {
    private static initialDrivers: Model<any>;

    static {
        if (!RidesDatabase.initialDrivers) {
            RidesDatabase.initialDrivers = mongoose.model('Driver');
            initializeDrivers();
        }
    }
}