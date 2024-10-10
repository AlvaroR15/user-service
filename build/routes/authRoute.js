"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post('/auth-user/register', authController_1.manualRegisterController);
router.post('/auth-user/login', authController_1.loginController);
router.post('/auth-user/logout', verifyTokenMiddleware_1.verifyToken, authController_1.logoutController);
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/', session: false }), authController_1.callbackOAuthGoogleController);
exports.default = router;
