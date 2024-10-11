import  User, {UserInput}  from "../models/User";
import { comparePasswords, hashPassword } from "./passwordUserService";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'


dotenv.config()



export const findOrCreateUserToAuthGoogle = async (profile: any) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          firstName: profile.name?.givenName||'',
          lastName: profile.name?.familyName||'',
          email: profile.emails[0].value||'',
          photo: profile.photos? profile.photos[0].value : null,
          role: 'USER',
          isDeleted: false
        });
        await user.save();
      }
      return user;
    } catch (error) {
      console.log('Error create or find user to auth google service: ', error);
      throw error;
    }
};



export const manualRegister = async (data: UserInput): Promise<number> => {
    const dataPassword = data.password ? hashPassword(data.password) : null;
  
    const newUser = new User({
      googleId: null,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: dataPassword,
      address: data.address,
      neighborhoods: data.neighborhoods,
      photo: data.photo || null,
      role: 'USER',
      isDeleted: false
    });
  
    try {
      await newUser.save();
      return 0;
    } catch (error) {
      console.log(error);
      return 1;
    }
};
  


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



export const login = async (email: string, password: string): Promise<{ success: boolean, token?: string }> => {
    const user = await User.findOne({ email });
  
    if (!user || !user.password) return { success: false };
  
    const passwordMatch = comparePasswords(password, user.password);
  
    if (!passwordMatch) return { success: false };
  
    const token = generateToken(user.id, user.email);
    return { success: true, token };
  };
  

