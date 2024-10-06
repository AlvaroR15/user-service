import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authRoute';
import userRouter from './routes/userRoute'
import { connectToDB } from './config/connectToDb';
import cookieParser from 'cookie-parser';


dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
connectToDB()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieParser());

app.use('/api-user', authRouter, userRouter)

app.listen(PORT, () => {
    console.log(`[server]: running on port ${PORT}`);
})