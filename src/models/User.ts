import mongoose from "mongoose";

export interface UserInputEdit {
    fullname: string,
    address: string,
    neighborhoods: string,
    photo: string
}

export interface UserInput {
    fullname:string,
    email:string,
    password:string | null,
    address:string | null,
    neighborhoods:string | null,
    photo: string | null,
    isDeleted: boolean
}

const userSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    fullname: {
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
export default User