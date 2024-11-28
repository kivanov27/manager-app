"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.User.find({});
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findById(id);
    if (!user) {
        throw new Error(`Could not find user with id ${id}`);
    }
    return user.toJSON();
});
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.User(newUser);
    const savedUser = yield user.save();
    return savedUser.toJSON();
});
const updateUser = (id, newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_1.User.findByIdAndUpdate(id, newUser, { new: true });
    if (!updatedUser) {
        throw new Error(`Cannot find user with id ${id}`);
    }
    return updatedUser.toJSON();
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.User.findByIdAndDelete(id);
});
exports.default = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
