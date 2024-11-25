import { app } from './controllers/app';
import { ridesRouter } from './controllers/routes/RidesRoutes';

app.use('/', ridesRouter);
