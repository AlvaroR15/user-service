import { Request, Response } from "express";
import { findOrCreateUserToAuthGoogle, generateToken, getGoogleUser, login, manualRegister } from "../services/authService";
import { successResponse, errorResponse, generalErrorResponse } from "../utils/responseUtils";


export const callbackOAuthGoogleController = (req:Request, res:Response) => {
    const token = generateToken(req.user._id,req.user.email)
    res.cookie('token',token,{httpOnly: false})
    return res.status(200).json(successResponse('User logged with Google successfully',200,token))
}


export const manualRegisterController = async (req:Request, res: Response) => {
    const fullname = `${req.body.firstName} ${req.body.lastName}`
    const dataBody = {
        fullname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        neighborhoods: req.body.neighborhoods,
        photo: req.body.photo
    }

    try {
        const saveUser = await manualRegister(dataBody);
        if(saveUser === 0) {
            return res.status(201).json(successResponse('User created successfully', 201, null))
        } else {
            return res.status(400).json(errorResponse('User could not be created', 400))
        }
    }catch (error) {
        return res.status(500).json(generalErrorResponse());
    }
}

export const loginController = async (req:Request, res:Response) => {
    const {email, password} = req.body;
    try {
        const result = await login(email,password);
        if(!result.success) {
            return res.status(401).json(errorResponse('Invalid email or password', 401))
        } else {
            res.cookie('token',result.token, {
                httpOnly:true,
                secure:false,
                sameSite:'strict'
            })
            
            return res.status(200).json(successResponse('Login successful',200,null))
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(generalErrorResponse())
    }
}

export const logoutController = async(req:Request, res:Response) => {
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:false,
            sameSite:'strict'
        });
        return res.status(200).json(successResponse('Logout successful', 200,null))
    } catch (error) {
        return res.status(500).json(generalErrorResponse())
    }
}