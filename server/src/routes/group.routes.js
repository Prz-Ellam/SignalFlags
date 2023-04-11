import { Router } from 'express';

const groupRouter = Router();

groupRouter.post('/');
groupRouter.get('/:id');
groupRouter.put('/:id');
groupRouter.delete('/:id');

// Buscar todos los grupos de un usuario

export default groupRouter;