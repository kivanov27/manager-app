import { User as UserModel } from "../models/user.ts";
import { User } from "../types.ts";

export const usersInDb = async (): Promise<User[]> => {
    const users = await UserModel.find({});
    return users.map((u) => u.toJSON());
};
