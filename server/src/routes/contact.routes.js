import { Router } from 'express';

const contactRouter = Router();

// Agregar un contacto
contactRouter.post('/');

// Eliminar un contacto
contactRouter.delete('/:id');

export default contactRouter;