import { Request, Response } from "express";
import { RidesBusiness } from "../business/RidesBusiness";

export class RidesController {
    constructor (private ridesBusiness: RidesBusiness) {}
    public checkHealtDatabase = async (req: Request, res: Response) => {
        try {
            await this.ridesBusiness.checkHealthBusiness();
            res.status(200).send({ status: 'The API is up and running. Health check is passed.' });
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
}