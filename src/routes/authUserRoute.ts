import express, { Request, Response } from 'express'
import { callbackOAuthGoogleController, loginController, logoutController, manualRegisterController, oauthRegisterController } from '../controllers/authUserController'
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import passport from 'passport';


const router = express.Router()


router.post('/auth-user/register', manualRegisterController);

router.post('/auth-user/login', loginController);

router.post('/auth-user/logout', verifyToken,logoutController);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/', session: false}), callbackOAuthGoogleController)

export default router