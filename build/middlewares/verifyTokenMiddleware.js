"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const responseUtils_1 = require("../utils/responseUtils");
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json((0, responseUtils_1.errorResponse)('Access deneid. No token provided', 401));
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error)
            return res.status(403).json((0, responseUtils_1.errorResponse)('Invalid token', 403));
        req.user = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
