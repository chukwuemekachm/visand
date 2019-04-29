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

app.use('*', (req, res) => res.status(404).json({
  message: 'Route un-available',
}));

// Error Handler
// eslint-disable-next-line no-unused-vars
app.use(({
  message = '', stack, statusCode = 500, errors,
}, req, res, next) => {
  logger.log({
    level: 'error',
    message: { message, stack },
  });
  return res.status(statusCode).json({
    message,
    errors,
    stackTrace: !isProduction ? undefined : stack,
  });
});

app.listen(PORT, () => logger.log({
  level: 'info',
  message: `Server listening on port ${PORT}`,
}));

export default app;
