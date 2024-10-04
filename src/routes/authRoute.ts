import express from 'express'
import { manualRegisterController } from '../controllers/authController'
import { editUserController } from '../controllers/userController';


const router = express.Router()


router.post('/auth-user/register', manualRegisterController);

router.put('/user/edit/:id', editUserController);


export default router