import express from 'express';
const messageRouter = express.Router();

messageRouter.get('/:id');
messageRouter.post('/');
messageRouter.put('/:id');
messageRouter.delete('/:id');

export default messageRouter;