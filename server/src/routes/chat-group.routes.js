import { Router } from 'express';
import { chatCreateController } from '../controllers/chat.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const chatGroupRouter = Router();

// Crear un grupo
chatGroupRouter.post('/', authMiddleware, chatCreateController);

// Actualizar un grupo
chatGroupRouter.put('/:id');

export default chatGroupRouter;