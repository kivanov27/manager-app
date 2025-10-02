import { User as UserModel } from "../models/user";
const getAllUsers = async () => {
    return await UserModel.find({});
};
const getUser = async (id) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw new Error(`Could not find user with id ${id}`);
    }
    return user.toJSON();
};
const createUser = async (newUser) => {
    const user = new UserModel(newUser);
    const savedUser = await user.save();
    return savedUser.toJSON();
};
const updateUser = async (id, newUser) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, newUser, { new: true });
    if (!updatedUser) {
        throw new Error(`Cannot find user with id ${id}`);
    }
    return updatedUser.toJSON();
};
const deleteUser = async (id) => {
    return await UserModel.findByIdAndDelete(id);
};
export default {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
