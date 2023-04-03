import express from 'express';
import UserController from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.post('/login', UserController.login);

userRouter.post('/', UserController.createUser);
userRouter.get('/:id', UserController.findOneUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;