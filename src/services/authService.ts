import  User, {UserInput}  from "../models/User";


export const manualRegister = async (data: UserInput): Promise<number> => {
    const newUser = new User({
        googleId: null,
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        address: data.address,
        neighborhoods: data.neighborhoods,
        photo: data.photo,
        role: 'USER'
    })

    try {
        await newUser.save();
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}