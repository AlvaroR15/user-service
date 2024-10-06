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
exports.logoutController = exports.loginController = exports.manualRegisterController = void 0;
const authService_1 = require("../services/authService");
const responseUtils_1 = require("../utils/responseUtils");
const manualRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fullname = `${req.body.firstName} ${req.body.lastName}`;
    const dataBody = {
        fullname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        neighborhoods: req.body.neighborhoods,
        photo: req.body.photo
    };
    try {
        const saveUser = yield (0, authService_1.manualRegister)(dataBody);
        if (saveUser === 0) {
            return res.status(201).json((0, responseUtils_1.successResponse)('User created successfully', 201, null));
        }
        else {
            return res.status(400).json((0, responseUtils_1.errorResponse)('User could not be created', 400));
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json((0, responseUtils_1.generalErrorResponse)());
    }
});
exports.manualRegisterController = manualRegisterController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield (0, authService_1.login)(email, password);
        if (!result.success) {
            console.log(result);
            return res.status(401).json((0, responseUtils_1.errorResponse)('Invalid email or password', 401));
        }
        else {
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict'
            });
            console.log('COOKIES: ', result.token);
            return res.status(200).json((0, responseUtils_1.successResponse)('Login successful', 200, null));
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json((0, responseUtils_1.generalErrorResponse)());
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });
        return res.status(200).json((0, responseUtils_1.successResponse)('Logout successful', 200, null));
    }
    catch (error) {
        return res.status(500).json((0, responseUtils_1.generalErrorResponse)());
    }
});
exports.logoutController = logoutController;
