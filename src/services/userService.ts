import User, { UserInputEdit } from "../models/User";

export const editProfileUser = async (data: UserInputEdit, id: string): Promise<number> => {
    try {
        const findUser = await User.findById(id);
        if(!findUser) {
            return 1;
        } else {
            findUser.fullname = data.fullname;
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