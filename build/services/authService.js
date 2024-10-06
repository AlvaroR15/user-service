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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.validateToken = exports.generateToken = exports.manualRegister = void 0;
const User_1 = __importDefault(require("../models/User"));
const passwordService_1 = require("./passwordService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const manualRegister = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User_1.default({
        googleId: null,
        fullname: data.fullname,
        email: data.email,
        password: (0, passwordService_1.hashPassowrd)(data.password),
        address: data.address,
        neighborhoods: data.neighborhoods,
        photo: data.photo,
        role: 'USER',
        isDeleted: false
    });
    try {
        yield newUser.save();
        return 0;
    }
    catch (error) {
        console.log(error);
        return 1;
    }
});
exports.manualRegister = manualRegister;
const generateToken = (idUser, email) => {
    const token = jsonwebtoken_1.default.sign({ id: idUser, email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};
exports.generateToken = generateToken;
const validateToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        return { valid: true, decoded };
    }
    catch (error) {
        return { valid: false };
    }
};
exports.validateToken = validateToken;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: email });
    if (!user)
        return { success: false };
    const passwordMath = (0, passwordService_1.comparePasswords)(password, user.password);
    if (!passwordMath)
        return { success: false };
    const token = (0, exports.generateToken)(user.id, user.email);
    return { success: true, token };
});
exports.login = login;
