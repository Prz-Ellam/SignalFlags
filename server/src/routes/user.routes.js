import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateIdMiddleware } from '../middlewares/validate-id.middleware.js';
import { validateCreateUser } from '../middlewares/validators/user.validator.js';

import UserController from '../controllers/user.controller.js';
import ChatController from '../controllers/chat.controller.js';
import HomeworkController from '../controllers/homework.controller.js';
import GroupController from '../controllers/group.controller.js';

const userRouter = Router();

userRouter.post('/auth', UserController.login);
userRouter.delete('/auth', authMiddleware, UserController.logout);

userRouter.get('/without-chat', authMiddleware, UserController.findAllNotChat);

userRouter.get('/', UserController.findAllUsersController);
userRouter.get('/:id', validateIdMiddleware, UserController.findOne);
userRouter.post('/', validateCreateUser, UserController.create);
userRouter.patch('/:id', authMiddleware, UserController.update);
//userRouter.delete('/:id', UserController.deleteUser);


// Busca todos los chats de un usuario
// [GET] /api/v1/users/:id/chats
userRouter.get('/:id/chats', validateIdMiddleware, authMiddleware, ChatController.findByUser);

// Busca todas las tareas de un usuario
// [GET] /api/v1/users/:id/homeworks
userRouter.get('/:id/homeworks', authMiddleware, HomeworkController.findByUser);
userRouter.get('/:id/homeworks/pending', authMiddleware, HomeworkController.findPendingByUser);
userRouter.get('/:id/homeworks/expired', authMiddleware, HomeworkController.findExpiredByUser);

// Busca todos los grupos de un usuario
userRouter.get('/:id/groups', GroupController.findByUser);

export default userRouter;