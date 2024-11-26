import express, { Request, Response } from 'express';

import { RidesController } from '../RidesController';
import { RidesDatabase } from '../../data/RidesDatabase';
import { RidesBusiness } from '../../business/RidesBusiness';

export const ridesRouter = express.Router();

const ridesDatabes = new RidesDatabase();
const ridesBusiness = new RidesBusiness(ridesDatabes);
const ridesController = new RidesController(ridesBusiness);

ridesRouter.post('/estimate', (req: Request, res: Response) => ridesController.estimate(req, res));