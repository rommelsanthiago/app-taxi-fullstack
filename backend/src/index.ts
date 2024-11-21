import { app } from './controllers/app';
import { healthCheckRouter } from './controllers/routes/HealthCheckRoutes';

app.use('/', healthCheckRouter);
