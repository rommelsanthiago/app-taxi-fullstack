import { BaseDatabase } from "./BaseDatabase";


export class RidesDatabase extends BaseDatabase {

    public checkHealtDatabase = async () => {
        try {
            await BaseDatabase.connection
            return true;
        } catch (error) {
            return false;
        }
    }
}