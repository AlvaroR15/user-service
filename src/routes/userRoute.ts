import express from 'express'
import { editUserController } from '../controllers/userController';

const router = express.Router()


router.put('/user/edit/:id', editUserController);

export default router
