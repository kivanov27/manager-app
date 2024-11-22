import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { toNewUser } from '../utils';
import userService from '../services/userService';

const userRouter = express.Router();

// userRouter.post('/', expressAsyncHandler(async (req, res) => {
//     const { username, password } = req.body;
//
//     const saltRounds: number = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);
//
//     const user = new User({
//         username,
//         passwordHash
//     });
//
//     const savedUser = await user.save();
//     res.status(201).json(savedUser);
// }));

userRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newUser = await toNewUser(req.body);
    const user = await userService.createUser(newUser);
    res.status(201).json(user);
}));

export default userRouter;
