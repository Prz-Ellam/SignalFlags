import { Router } from 'express';
import { findUserChatsController } from '../controllers/chat.controller.js';
import UserController, { userFindAllNotChatController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateIdMiddleware } from '../middlewares/validate-id.middleware.js';
import { validateCreateUser } from '../middlewares/validators/user.validator.js';
const userRouter = Router();

userRouter.post('/auth', UserController.userLoginController);

userRouter.get('/without-chat', authMiddleware, userFindAllNotChatController);

userRouter.get('/', UserController.findAllUsersController);
userRouter.get('/:id', validateIdMiddleware, UserController.findOneUserController);
userRouter.post('/', validateCreateUser, UserController.userCreateController);
userRouter.patch('/:id', authMiddleware, UserController.userUpdateController);
//userRouter.delete('/:id', UserController.deleteUser);


// Busca todos los chats de un usuario
userRouter.get('/:id/chats', validateIdMiddleware, authMiddleware, findUserChatsController);

export default userRouter;