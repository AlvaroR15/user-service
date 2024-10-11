import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authUserRoute';
import userRouter from './routes/userRoute'
import { connectToDB } from './config/connectToDb';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/passportConfig';


dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;


connectToDB()

app.use(passport.initialize());
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieParser());

app.use('/api-user', authRouter, userRouter)

app.listen(PORT, () => {
    console.log(`[server]: running on port ${PORT}`);
})