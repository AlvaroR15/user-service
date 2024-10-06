import  User, {UserInput}  from "../models/User";
import { comparePasswords, hashPassowrd } from "./passwordService";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()


export const manualRegister = async (data: UserInput): Promise<number> => {
    const newUser = new User({
        googleId: null,
        fullname: data.fullname,
        email: data.email,
        password: hashPassowrd(data.password),
        address: data.address,
        neighborhoods: data.neighborhoods,
        photo: data.photo,
        role: 'USER',
        isDeleted: false
    })

    try {
        await newUser.save();
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}


export const generateToken = (idUser:string, email:string):string => {
    const token = jwt.sign({id:idUser, email:email}, process.env.JWT_SECRET_KEY!,{expiresIn:'1h'});
    return token;
}


export const validateToken = (token:string):{valid:boolean, decoded?:any} => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!)
        return {valid:true, decoded}
    } catch (error) {
        return {valid:false}
    }
}



export const login = async(email:string, password:string):Promise<{success:boolean, token?:string}> => {
    const user = await User.findOne({email:email});

    if(!user) return {success:false}

    const passwordMath = comparePasswords(password, user.password);
    
    if(!passwordMath) return {success: false}

    const token = generateToken(user.id,user.email);
    return {success:true, token}
}

