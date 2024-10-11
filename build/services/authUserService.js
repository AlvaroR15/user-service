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
exports.login = exports.validateToken = exports.generateToken = exports.manualRegister = exports.findOrCreateUserToAuthGoogle = void 0;
const User_1 = __importDefault(require("../models/User"));
const passwordUserService_1 = require("./passwordUserService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const findOrCreateUserToAuthGoogle = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let user = yield User_1.default.findOne({ googleId: profile.id });
        if (!user) {
            user = new User_1.default({
                googleId: profile.id,
                firstName: ((_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName) || '',
                lastName: ((_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName) || '',
                email: profile.emails[0].value || '',
                photo: profile.photos ? profile.photos[0].value : null,
                role: 'USER',
                isDeleted: false
            });
            yield user.save();
        }
        return user;
    }
    catch (error) {
        console.log('Error create or find user to auth google service: ', error);
        throw error;
    }
});
exports.findOrCreateUserToAuthGoogle = findOrCreateUserToAuthGoogle;
const manualRegister = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User_1.default({
        googleId: null,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: (0, passwordUserService_1.hashPassowrd)(data.password),
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
    const passwordMath = (0, passwordUserService_1.comparePasswords)(password, user.password);
    if (!passwordMath)
        return { success: false };
    const token = (0, exports.generateToken)(user.id, user.email);
    return { success: true, token };
});
exports.login = login;
