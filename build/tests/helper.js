import { User as UserModel } from "../models/user";
export const usersInDb = async () => {
    const users = await UserModel.find({});
    return users.map((u) => u.toJSON());
};
