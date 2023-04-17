import { Router } from 'express';
import { findUserChatsController } from '../controllers/chat.controller.js';
import UserController, { userFindAllNotChatController, userFindGroups } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateIdMiddleware } from '../middlewares/validate-id.middleware.js';
import { validateCreateUser } from '../middlewares/validators/user.validator.js';
const userRouter = Router();

import HomeworkController from '../controllers/homework.controller.js';

// Iniciar sesión
// Cerrar sesión
// Registrarse
// Actualizar informacion
// Actualizar contraseña
// Actualizar avatar
// Confirmar cuenta con el token

// Obtener todos los chats de un usuario
// Obtener un usuario basado en su id
// Obtener todos los usuarios excepto el autenticado
// Obtener todos los usuarios con los que no se tiene un chat
userRouter.post('/auth', UserController.login);

userRouter.get('/without-chat', authMiddleware, userFindAllNotChatController);

userRouter.get('/', UserController.findAllUsersController);
userRouter.get('/:id', validateIdMiddleware, UserController.findOne);
userRouter.post('/', validateCreateUser, UserController.create);
userRouter.patch('/:id', authMiddleware, UserController.update);
//userRouter.delete('/:id', UserController.deleteUser);


// Busca todos los chats de un usuario
// [GET] /api/v1/users/:id/chats
userRouter.get('/:id/chats', validateIdMiddleware, authMiddleware, findUserChatsController);

// Busca todas las tareas de un usuario
// [GET] /api/v1/users/:id/homeworks
userRouter.get('/:id/homeworks', authMiddleware, HomeworkController.findByUser);
userRouter.get('/:id/homeworks/pending', authMiddleware, HomeworkController.findPendingByUser);
userRouter.get('/:id/homeworks/expired', authMiddleware, HomeworkController.findExpiredByUser);

// Busca todos los grupos de un usuario
userRouter.get('/:id/groups', userFindGroups);

export default userRouter;