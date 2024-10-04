import { Request, Response } from "express";
import { editProfileUser } from "../services/userService";
import { successResponse, errorResponse, generalErrorResponse } from "../utils/responseUtils";


export const editUserController = async(req:Request, res: Response) => {
    const dataBody = {
        fullname: req.body.firstName+' '+req.body.lastName,
        address: req.body.address,
        neighborhoods: req.body.neighborhoods,
        photo: req.body.photo
    }

    try {
        const saveUser = await editProfileUser(dataBody, req.params.id);
        if(saveUser === 2) {
            return res.status(404).json(errorResponse('User not found', 404))
        } else {
            return res.status(200).json(successResponse('User edited successfully', 200, null))
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(generalErrorResponse())
    }
}