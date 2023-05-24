import { Router } from 'express';
import { multerUpload2 } from '../configuration/multer.js';
import ChatController, { addUserToChatController, chatAccessController, chatDesencrypt, chatEncrypt, chatFindUsersController } from '../controllers/chat.controller.js';
import MessageController from '../controllers/message.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateIdMiddleware } from '../middlewares/validate-id.middleware.js';

const chatRouter = Router();

chatRouter.get('/:id', ChatController.findById);

// Crear un chat
chatRouter.post('/', authMiddleware, chatAccessController);

chatRouter.post('/:id/desencrypt', authMiddleware, chatDesencrypt);
chatRouter.post('/:id/encrypt', authMiddleware, chatEncrypt);

// Añadir usuario al chat
chatRouter.post('/:chatId/users/:userId', validateIdMiddleware, authMiddleware, addUserToChatController);

// Eliminar usuario del chat
chatRouter.delete('/:chatId/users/:userId');

// Eliminar un chat
chatRouter.delete('/:id');


// Enviar un mensaje a un chat
chatRouter.post('/:chatId/messages', authMiddleware, MessageController.create);
chatRouter.post('/:chatId/messages/uploads', authMiddleware, multerUpload2.array('files'), 
(req, res, next) => {
    try {
        req.body = JSON.parse(req.body.payload);
        console.log(req.body);
        next();
    }
    catch (exception) {
        return res.json('Error');
    }
}, MessageController.create);

// Obtener todos los mensajes de un chat
chatRouter.get('/:chatId/messages', authMiddleware, MessageController.findByChat);


chatRouter.get('/:id/members', chatFindUsersController);




export default chatRouter;