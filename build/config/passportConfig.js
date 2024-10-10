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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = __importDefault(require("../models/User"));
const authService_1 = require("../services/authService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/api-user/google/callback`,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, authService_1.findOrCreateUserToAuthGoogle)(profile);
        done(null, user.user);
    }
    catch (error) {
        done(error, false);
    }
})));
// serialize the user for the session (store user ID)
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserialize the user by their ID from the session
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id); // Fetch user by ID
        done(null, user); // pass the user to the next middleware
    }
    catch (error) {
        done(error, false);
    }
}));
