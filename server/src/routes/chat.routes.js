import { Router } from 'express';
import { addUserToChatController, createChatController } from '../controllers/chat.controller.js';

const chatRouter = Router();

// Crear un chat
chatRouter.post('/', createChatController);

// Añadir usuario al chat
chatRouter.post('/:chatId/users/:userId', addUserToChatController);

// Eliminar usuario del chat
chatRouter.delete('/:chatId/users/:userId');

// Eliminar un chat
chatRouter.delete('/:id');


// Mandar un mensaje a un chat
chatRouter.post('/:chatId/messages');


export default chatRouter;