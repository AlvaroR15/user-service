import { Request, Response } from "express";
import { manualRegister } from "../services/authService";
import { successResponse, errorResponse, generalErrorResponse } from "../utils/responseUtils";

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
        console.log(error);
        return res.status(500).json(generalErrorResponse());
    }
}