import bcrypt from 'bcryptjs'

export const hashPassword = (password:string):string => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword
}


export const comparePasswords = (plainPassword:string, hashedPassword:string):boolean => {
    const verifyPassword = bcrypt.compareSync(plainPassword, hashedPassword);

    if(!verifyPassword) {
        return false;
    } else {
        return true;
    }
}