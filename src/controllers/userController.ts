import { Request, Response } from "express";
import { editProfileUser, getUserProfile, softUserDeletion } from "../services/userService";
import { successResponse, errorResponse, generalErrorResponse } from "../utils/responseUtils";
import { validateUserInputEdit } from "../models/User";


export const editUserController = async(req:Request, res: Response) => {
    const result = validateUserInputEdit(req.body);
    if(!result.success) return res.status(400).json(result.error.issues)

    const dataBody = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        neighborhoods: req.body.neighborhoods,
        photo: req.body.photo
    }

    try {
        const userId = req.user.id;
        const saveUser = await editProfileUser(dataBody, userId);
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


export const userProfileController = async(req:Request, res: Response) => {
    try {
        
        const userId = req.user.id;

        
        const user = await getUserProfile(userId);

        if(!user) {
            return res.status(404).json(errorResponse('User not found',404))
        } else {
            return res.status(200).json(successResponse('User found successfully',200,user))
        }
    } catch (error) {
        return res.status(500).json(generalErrorResponse());
    }
}


export const deleteUserController = async(req:Request, res:Response) => {
    try {
        const userId = req.user.id;
        const deleteUser = await softUserDeletion(userId);
        if(deleteUser == 0) {
            return res.status(200).json(successResponse('User deleted successfully',200,null))
        } else {
            return res.status(404).json(errorResponse('User not found',404))
        }
    } catch (error) {
        return res.status(500).json(generalErrorResponse())
    }
}