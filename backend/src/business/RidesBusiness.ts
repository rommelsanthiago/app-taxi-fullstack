import RideService from "../services/RideService";
import { RidesRepository } from "./RidesRepository";
import { CustomError } from "../errors/customErrors";

export class RidesBusiness {
    constructor(
        private readonly ridesRepository: RidesRepository,
    ){}

    public estimate = async (customer_id: string, origin: string, destination: string) => {
        try {
            const estimate = await RideService.calculateEstimate({ customer_id, origin, destination });

            return estimate;
        } catch (error: any) {
            console.error(error);
            throw new CustomError(error.stack, error.message);
        }
    }
};
