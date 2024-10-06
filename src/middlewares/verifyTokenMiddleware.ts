import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import { errorResponse } from '../utils/responseUtils'

dotenv.config()


export const verifyToken = (req:Request, res:Response, next: NextFunction) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json(errorResponse('Access deneid. No token provided',401));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (error:any,decoded:any) => {
        if(error) return res.status(403).json(errorResponse('Invalid token', 403))

            
        req.user = decoded;
        next()
    })

}