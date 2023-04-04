import { Router } from 'express';
import { findUserChatsController } from '../controllers/chat.controller.js';
import UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateCreateUser } from '../middlewares/validators/user.validator.js';
const userRouter = Router();

userRouter.post('/auth', UserController.userLoginController);

userRouter.get('/', UserController.findAllUsersController);
userRouter.post('/', validateCreateUser, UserController.createUser);
userRouter.get('/:id', UserController.findOneUserController);
userRouter.patch('/:id', authMiddleware, UserController.userUpdateController);
//userRouter.delete('/:id', UserController.deleteUser);
userRouter.get('/:id/chats', findUserChatsController);

export default userRouter;