import express, { Request, Response } from 'express';

import { RidesDatabase } from '../../data/RidesDatabase';
import { RidesBusiness } from '../../business/RidesBusiness';
import { RidesController } from '../RidesController';

export const ridesRouter = express.Router();

const ridesDatabes = new RidesDatabase();
const ridesBusiness = new RidesBusiness(ridesDatabes);
const ridesController = new RidesController(ridesBusiness);

ridesRouter.get('/', (req: Request, res: Response) => ridesController.checkHealtDatabase(req, res));