import User, { UserInputEdit } from "../models/User";

export const editProfileUser = async (data: UserInputEdit, id: string): Promise<number> => {
    try {
        const findUser = await User.findById(id);
        if(!findUser) {
            return 1;
        } else {
            findUser.firstName = data.firstName;
            findUser.lastName = data.lastName;
            findUser.address = data.address;
            findUser.neighborhoods = data.neighborhoods;
            if(data.photo) {
                findUser.photo = data.photo;
            }
            await findUser.save()
            return 0;
        }
    } catch (error) {
        console.log(error);
        return 2;
    }
}

export const getUserProfile = async (id: string) => {
    try {
        const findUser = await User.findById(id);
        if(findUser) {
            return findUser;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }   
}


export const softUserDeletion = async(id:string) => {
    try {
        const userToDelete = await getUserProfile(id);
        if(userToDelete !== null) {
            userToDelete.isDeleted = true;
            await userToDelete.save();
            return 0;
        } else {
            return 2;
        }
    } catch (error) {
        return 1;
    }
}