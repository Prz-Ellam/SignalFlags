import { Router } from 'express';
const homeworkRouter = Router();

homeworkRouter.get('/:id');
homeworkRouter.post('/');

homeworkRouter.put('/:id');
homeworkRouter.delete('/:id');

// Obtener todas las tareas de un grupo
// Obtener todas las tareas de un usuario

export default homeworkRouter;