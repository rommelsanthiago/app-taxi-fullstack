import { Request, Response } from "express";
import { RidesBusiness } from "../business/RidesBusiness";

export class RidesController {
    constructor (private ridesBusiness: RidesBusiness) {}
    public estimate = async (req: Request, res: Response) => {
        try {
            const { customer_id, origin, destination } = req.body;

            const estimate = await this.ridesBusiness.estimate(customer_id, origin, destination);

            res.status(200).send({message: "Operação realizada com sucesso", estimate});
        } catch (error: any) {
            console.log(error)
            res.status(error.error_code).send({
                error_code: error.error_code,
                description: error.description,
                error_description: error.error_description,
            });
        }
    }
}