import express from 'express'
import { loginController, logoutController, manualRegisterController } from '../controllers/authController'
import { verifyToken } from '../middlewares/verifyTokenMiddleware';


const router = express.Router()


router.post('/auth-user/register', manualRegisterController);

router.post('/auth-user/login', loginController);

router.post('/auth-user/logout', verifyToken,logoutController);



export default router