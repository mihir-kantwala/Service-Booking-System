import express from 'express';
import cors from 'cors';

import serviceRoute from './routes/serviceRoute.js';
import { logger } from './middlewares/logger.js';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(logger);
app.use('/api', serviceRoute);

export default app;
