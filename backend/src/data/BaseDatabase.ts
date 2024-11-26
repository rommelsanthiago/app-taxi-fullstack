import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.set("strictQuery", true);

export class BaseDatabase {
    protected static connection = mongoose.connect(process.env.MONGODB_URI!)
        .then((conn) => {
            console.log("Connected to MongoDB successfully!!!");

            return conn;
        }).catch((error: any) => {
            console.warn("Error in DB connection : " + JSON.stringify(error, undefined, 2));
        });
};
