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
exports.manualRegister = void 0;
const User_1 = __importDefault(require("../models/User"));
const passwordService_1 = require("./passwordService");
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
