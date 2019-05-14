import 'dotenv/config';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import passport from 'passport';
import cors from 'cors';

import router from './routes';
import logger from './utils/logger';
import passportAuth from './config/passport';

const app = express();
const { NODE_ENV, PORT = 9000 } = process.env;
const isProduction = NODE_ENV === 'production';

// Middlewares
// CORS middleware
app.use(cors());

// Body parser and helmet middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport auth
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(passportAuth);
app.use(passport.initialize());

// API Routes
app.use('/api/v1', router);

app.use('/images', express.static(path.join(process.cwd(), 'images')));

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
    stackTrace: isProduction ? undefined : stack,
  });
});

app.listen(PORT, () => logger.log({
  level: 'info',
  message: `Server listening on port ${PORT}`,
}));

export default app;
