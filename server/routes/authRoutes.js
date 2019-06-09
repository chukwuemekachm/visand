/**
 * @fileOverview Contains the auth routes definitions
 *
 * @author Chima Chukwuemeka
 *
 * @requires NPM:express
 * @requires NPM:passport
 * @requires server/controllers/AuthController.js
*/

import { Router } from 'express';
import passport from 'passport';

import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

router.get('/facebook', passport.authenticate('facebook-token'), AuthController.facebookAuth);

export default router;
