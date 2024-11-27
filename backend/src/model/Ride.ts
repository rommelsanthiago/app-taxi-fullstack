import mongoose, { Schema, Document } from "mongoose";

export interface RideEstimateInput {
    customer_id?: string;
    origin: string;
    destination: string;
};

export interface RideConfirmInput {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
        id: number;
        name: string;
    };
    value: number;
}

export interface Driver extends Document {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number;
        comment: string;
    };
    ratePerKm: number;
    minKm: number;
};

export interface Estimates {
    origin: {
        latitude: number;
        longitude: number;
    };
    destination: {
        latitude: number;
        longitude: number;
    };
    distance: number;
    duration: string;
    options: Driver[];
    routeResponse: {
        geocoded_waypoints: GeocodedWaypoint[][],
        routes: [any[]],
        status: string
    }
}

export interface GeocodedWaypoint {
    geocoder_status: string
    place_id: string
    types: string[]
}

export interface Ride {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
        id: number;
        name: string;
    };
    value: number;
}

const DriverSchema = new Schema<Driver>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    vehicle: { type: String, required: true },
    review: {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    ratePerKm: { type: Number, required: true },
    minKm: { type: Number, required: true },
    },{timestamps: true}
);

export const RideSchema = new Schema<Ride>({
    customer_id: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    distance: { type: Number, required: true },
    duration: { type: String, required: true },
    driver: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
    },
    value: { type: Number, required: true },
    },{timestamps: true}
);

export const DriverModel = mongoose.model<Driver>("Driver", DriverSchema);
export const RideModel = mongoose.model<Ride>("Ride", RideSchema);