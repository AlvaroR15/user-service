"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserInputEdit = exports.validateUserInput = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const UserInputSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(3, 'El nombre es requerido'),
    lastName: zod_1.default.string().min(3, 'El apellido es requerido'),
    email: zod_1.default.string().email('Dirección de correo inválida'),
    password: zod_1.default.string().nullable().optional(),
    address: zod_1.default.string().nullable().optional(),
    neighborhoods: zod_1.default.string().nullable().optional(),
    photo: zod_1.default.string().nullable().optional()
});
const UserInputEditSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(3, 'El nombre es requerido'),
    lastName: zod_1.default.string().min(3, 'El apellido es requerido'),
    address: zod_1.default.string().min(5, 'El domicilio es requerido'),
    neighborhoods: zod_1.default.string().min(5, 'El barrio es requerido'),
    photo: zod_1.default.string().nullable().optional()
});
const userSchema = new mongoose_1.default.Schema({
    googleId: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    address: {
        type: String,
    },
    neighborhoods: {
        type: String,
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER'
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', userSchema);
const validateUserInput = (data) => {
    return UserInputSchema.safeParse(data);
};
exports.validateUserInput = validateUserInput;
const validateUserInputEdit = (data) => {
    return UserInputEditSchema.safeParse(data);
};
exports.validateUserInputEdit = validateUserInputEdit;
exports.default = User;
