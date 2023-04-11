import { Router } from 'express';
import { addUserToChatController, chatAccessController } from '../controllers/chat.controller.js';
import { messagefindAllByChatController, messageCreateController } from '../controllers/message.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateIdMiddleware } from '../middlewares/validate-id.middleware.js';

const chatRouter = Router();

// Crear un chat
chatRouter.post('/', authMiddleware, chatAccessController);

// Añadir usuario al chat
chatRouter.post('/:chatId/users/:userId', validateIdMiddleware, authMiddleware, addUserToChatController);

// Eliminar usuario del chat
chatRouter.delete('/:chatId/users/:userId');

// Eliminar un chat
chatRouter.delete('/:id');


// Enviar un mensaje a un chat
chatRouter.post('/:chatId/messages', authMiddleware, messageCreateController);

// Obtener todos los mensajes de un chat
chatRouter.get('/:chatId/messages', authMiddleware, messagefindAllByChatController);





export default chatRouter;