import { Request, Response } from "express";
import { RidesBusiness } from "../business/RidesBusiness";
import { RideConfirmInput } from "../model/Ride";

export class RidesController {
    constructor (private ridesBusiness: RidesBusiness) {}
    public estimate = async (req: Request, res: Response) => {
        try {
            const { customer_id, origin, destination } = req.body;

            const estimate = await this.ridesBusiness.estimate(customer_id, origin, destination);

            res.status(200).json({message: "Operação realizada com sucesso", estimate});
        } catch (error: any) {
            console.log(error)
            res.status(error.error_code).send({
                error_code: error.error_code,
                description: error.description,
                error_description: error.error_description,
            });
        }
    }

    public confirmRide = async (req: Request, res: Response) => {
        try {
            const { customer_id, origin, destination, driver, distance, duration, value } = req.body;

            const input: RideConfirmInput = {
                customer_id,
                origin,
                destination,
                driver: {
                    id: driver.id,
                    name: driver.name
                },
                distance,
                duration,
                value
            }

            await this.ridesBusiness.confirmRide(input);

            res.status(200).json({message: "Operação realizada com sucesso", "success": true});
        } catch (error: any) {
            res.status(error.error_code).send({
                error_code: error.error_code,
                description: error.description,
                error_description: error.error_description,
            });
        }
    }
}