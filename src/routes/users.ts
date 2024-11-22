import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { toNewUser } from '../utils';
import userService from '../services/userService';

const userRouter = express.Router();

userRouter.get('/', expressAsyncHandler(async (_req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
}));

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await userService.getUser(req.params.id);
    res.json(user);
}));

userRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newUser = await toNewUser(req.body);
    const user = await userService.createUser(newUser);
    res.status(201).json(user);
}));

userRouter.put('/:id', expressAsyncHandler(async (req, res) => { 
    const updatedUser = await toNewUser(req.body);
    const user = await userService.updateUser(req.params.id, updatedUser);
    res.json(user);
}));

userRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.status(204).end();
}));

export default userRouter;
