"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const router = express_1.default.Router();
router.get('/profile', verifyTokenMiddleware_1.verifyToken, userController_1.userProfileController);
router.put('/edit', verifyTokenMiddleware_1.verifyToken, userController_1.editUserController);
router.delete('/delete', verifyTokenMiddleware_1.verifyToken, userController_1.deleteUserController);
exports.default = router;
