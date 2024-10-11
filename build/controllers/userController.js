"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.userProfileController = exports.editUserController = void 0;
const userService_1 = require("../services/userService");
const responseUtils_1 = require("../utils/responseUtils");
const User_1 = require("../models/User");
const editUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, User_1.validateUserInput)(req.body);
    if (!result.success)
        return res.status(400).json(result.error.issues);
    const dataBody = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        neighborhoods: req.body.neighborhoods,
        photo: req.body.photo
    };
    try {
        const userId = req.user.id;
        const saveUser = yield (0, userService_1.editProfileUser)(dataBody, userId);
        if (saveUser === 2) {
            return res.status(404).json((0, responseUtils_1.errorResponse)('User not found', 404));
        }
        else {
            return res.status(200).json((0, responseUtils_1.successResponse)('User edited successfully', 200, null));
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json((0, responseUtils_1.generalErrorResponse)());
    }
});
exports.editUserController = editUserController;
const userProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const user = yield (0, userService_1.getUserProfile)(userId);
        if (!user) {
            return res.status(404).json((0, responseUtils_1.errorResponse)('User not found', 404));
        }
        else {
            return res.status(200).json((0, responseUtils_1.successResponse)('User found successfully', 200, user));
        }
    }
    catch (error) {
        return res.status(500).json((0, responseUtils_1.generalErrorResponse)());
    }
});
exports.userProfileController = userProfileController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const deleteUser = yield (0, userService_1.softUserDeletion)(userId);
        if (deleteUser == 0) {
            return res.status(200).json((0, responseUtils_1.successResponse)('User deleted successfully', 200, null));
        }
        else {
            return res.status(404).json((0, responseUtils_1.errorResponse)('User not found', 404));
        }
    }
    catch (error) {
        return res.status(500).json((0, responseUtils_1.generalErrorResponse)());
    }
});
exports.deleteUserController = deleteUserController;
