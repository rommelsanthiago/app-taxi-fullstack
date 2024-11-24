import express, { Request, Response } from 'express';

import { HealthCheckController } from '../HealthCheckController';

export const healthCheckRouter = express.Router();

const healthCheckController = new HealthCheckController();

healthCheckRouter.get('/', (req: Request, res: Response) => healthCheckController.healthCheck(req, res));