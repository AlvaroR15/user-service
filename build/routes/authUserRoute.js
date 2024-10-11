"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authUserController_1 = require("../controllers/authUserController");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post('/auth-user/register', authUserController_1.manualRegisterController);
router.post('/auth-user/login', authUserController_1.loginController);
router.post('/auth-user/logout', verifyTokenMiddleware_1.verifyToken, authUserController_1.logoutController);
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/', session: false }), authUserController_1.callbackOAuthGoogleController);
exports.default = router;
