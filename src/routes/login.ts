// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import express from 'express';
// import { User } from '../models/user';
// import expressAsyncHandler from 'express-async-handler';
// import { toNewUser } from '../utils';
//
// const loginRouter = express.Router();
//
// loginRouter.post('/', expressAsyncHandler(async (req, res) => {
//     const user = await toNewUser(req.body);
//
//     const existingUser = await User.findOne({ username:  user.username });
//     const passwordCorrect = existingUser === null
//         ? false
//         : await bcrypt.compare(user.passwordHash, existingUser.passwordHash);
//
//     if (!(existingUser && passwordCorrect)) {
//         return res.status(401).json({
//             error: 'invalid username or password'
//         });
//     }
//
//     const userForToken = {
//         username: existingUser.username,
//         id: existingUser._id
//     };
//
//     const token = jwt.sign(userForToken, process.env.SECRET);
// }));
