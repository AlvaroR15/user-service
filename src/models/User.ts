import mongoose from "mongoose";

export interface UserInput {
    fullname:string,
    email:string,
    password:string,
    address:string,
    neighborhoods:string,
    photo: string,
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
        required: true
    },
    address: {
        type: String,
        required: true
    },
    neighborhoods: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER'
    }
})

const User = mongoose.model<UserInput>('User', userSchema);
export default User