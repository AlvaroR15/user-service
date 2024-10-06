import express from 'express'
import { deleteUserController, editUserController, userProfileController } from '../controllers/userController';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';

const router = express.Router()

router.get('/profile', verifyToken,userProfileController)

router.put('/edit/:id', editUserController);

router.delete('/delete/:id', deleteUserController)



export default router
