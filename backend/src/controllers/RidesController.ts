import { Request, Response } from "express";
import { RidesBusiness } from "../business/RidesBusiness";

export class RidesController {
    constructor (private ridesBusiness: RidesBusiness) {}
    public estimate = async (req: Request, res: Response) => {
        try {
            const { customer_id, origin, destination } = req.body;
            const estimate = await this.ridesBusiness.estimate(customer_id, origin, destination);

            res.status(200).send(estimate);
        } catch (error: any) {
            res.status(error.statusCode || 400).send({
                error_code: error.code || "INVALID_DATA",
                error_description: error.message,
            });
        }
    }
}