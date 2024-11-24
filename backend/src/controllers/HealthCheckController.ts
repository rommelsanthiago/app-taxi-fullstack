import { Request, Response } from "express";

export class HealthCheckController {
    public healthCheck(req: Request, res: Response) {
        res.status(200).send({ status: 'The API is up and running. Health check is passed.' });
    }
}