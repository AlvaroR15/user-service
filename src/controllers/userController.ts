import { Request, Response } from "express";
import { editProfileUser, getUserProfile, softUserDeletion } from "../services/userService";
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


export const userProfileController = async(req:Request, res: Response) => {
    try {
        
        const userId = req.user.id;

        console.log(userId);
        
        const user = await getUserProfile(userId);
        console.log(user);

        if(!user) {
            return res.status(404).json(errorResponse('User not found',404))
        } else {
            console.log(user);
            return res.status(200).json(successResponse('User found successfully',200,user))
        }
    } catch (error) {
        return res.status(500).json(generalErrorResponse());
    }
}


export const deleteUserController = async(req:Request, res:Response) => {
    try {
        const deleteUser = await softUserDeletion(req.params.id);
        if(deleteUser == 0) {
            return res.status(200).json(successResponse('User deleted successfully',200,null))
        } else {
            return res.status(404).json(errorResponse('User not found',404))
        }
    } catch (error) {
        return res.status(500).json(generalErrorResponse())
    }
}