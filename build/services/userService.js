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
exports.softUserDeletion = exports.getUserProfile = exports.editProfileUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const editProfileUser = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield User_1.default.findById(id);
        if (!findUser) {
            return 1;
        }
        else {
            findUser.firstName = data.firstName;
            findUser.lastName = data.lastName;
            findUser.address = data.address;
            findUser.neighborhoods = data.neighborhoods;
            if (data.photo) {
                findUser.photo = data.photo;
            }
            yield findUser.save();
            return 0;
        }
    }
    catch (error) {
        console.log(error);
        return 2;
    }
});
exports.editProfileUser = editProfileUser;
const getUserProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield User_1.default.findById(id);
        if (findUser) {
            return findUser;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getUserProfile = getUserProfile;
const softUserDeletion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToDelete = yield (0, exports.getUserProfile)(id);
        if (userToDelete !== null) {
            userToDelete.isDeleted = true;
            yield userToDelete.save();
            return 0;
        }
        else {
            return 2;
        }
    }
    catch (error) {
        return 1;
    }
});
exports.softUserDeletion = softUserDeletion;
