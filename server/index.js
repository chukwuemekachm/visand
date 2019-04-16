import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import router from './routes';
import logger from './utils/logger';

const app = express();
const { NODE_ENV, PORT = 3000 } = process.env;
const isProduction = NODE_ENV === 'production';

// Middlewares
// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Body parser and helmet middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Routes
app.use('/api/v1', router);

app.use('*', (req, res) =>
  res.status(404).json({
    message: 'Route un-available',
  }),
);

// Error Handler
app.use((err, req, res) => {
  logger.log({
    level: 'error',
    message: err,
  });
  return res.status(500).json({
    message: 'Internal server error',
    error: isProduction ? null : err,
  });
});

app.listen(PORT, () =>
  logger.log({
    level: 'info',
    message: `Server listening on port ${PORT}`,
  }),
);

export default app;
