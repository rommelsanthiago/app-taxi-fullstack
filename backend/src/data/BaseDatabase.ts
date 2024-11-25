import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set("strictQuery", true);

export class BaseDatabase {
    private static readonly MAX_TRY = 10;
    private static currentAttempt: number = 0;

    protected static connection = mongoose.connect(process.env.MONGODB_URI!)
        .then((conn) => {
            console.log("Connected to MongoDB successfully!!!");
            BaseDatabase.currentAttempt = 0;
            return conn;
        }).catch((error: any) => {
            BaseDatabase.currentAttempt++;
            console.warn("Error in DB connection : " + JSON.stringify(error, undefined, 2));
            console.log("Retry connection in 10 seconds!");

            if (BaseDatabase.currentAttempt < BaseDatabase.MAX_TRY) {
                BaseDatabase.currentAttempt++;
                setTimeout(() => BaseDatabase.connection, 10000)
            };
        });
};
