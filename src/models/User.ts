import mongoose from "mongoose";
import z from 'zod'

const UserInputSchema = z.object({
    firstName: z.string().min(3, 'El nombre es requerido'),
    lastName: z.string().min(3, 'El apellido es requerido'),
    email: z.string().email('Dirección de correo inválida'),
    password: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    neighborhoods: z.string().nullable().optional(),
    photo: z.string().nullable().optional()
})

const UserInputEditSchema = z.object({
    firstName: z.string().min(3, 'El nombre es requerido'),
    lastName: z.string().min(3,'El apellido es requerido'),
    address: z.string().min(5,'El domicilio es requerido'),
    neighborhoods: z.string().min(5, 'El barrio es requerido'),
    photo: z.string().nullable().optional()
})

export interface UserInput {
    firstName:string
    lastName: string
    email:string
    password: string | null;
    address: string |null;
    neighborhoods: string | null
    photo:string | null;
    isDeleted: boolean;
}

export interface UserInputEdit {
    firstName:string;
    lastName:string
    address: string;
    neighborhoods:string;
    photo: string;
}
  

const userSchema = new mongoose.Schema({
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
})

const User = mongoose.model<UserInput>('User', userSchema);

export const validateUserInput = (data: any) => {
    return UserInputSchema.safeParse(data)
}

export const validateUserInputEdit = (data:any) => {
    return UserInputEditSchema.safeParse(data)
}

export default User