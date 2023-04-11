import { Router } from 'express';
const messageRouter = Router();

messageRouter.get('/:id');

// Enviar un mensaje
messageRouter.post('/');
messageRouter.put('/:id');
messageRouter.delete('/:id');

export default messageRouter;