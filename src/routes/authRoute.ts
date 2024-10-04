import express from 'express'
import { manualRegisterController } from '../controllers/authController'


const router = express.Router()


router.post('/create', manualRegisterController);


export default router