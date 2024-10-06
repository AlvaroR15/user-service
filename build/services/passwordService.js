"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassowrd = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassowrd = (password) => {
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    return hashedPassword;
};
exports.hashPassowrd = hashPassowrd;
const comparePasswords = (plainPassword, hashedPassword) => {
    const verifyPassword = bcryptjs_1.default.compareSync(plainPassword, hashedPassword);
    if (!verifyPassword) {
        return false;
    }
    else {
        return true;
    }
};
exports.comparePasswords = comparePasswords;
