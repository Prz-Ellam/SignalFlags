import express from 'express';
const homeworkRouter = express.Router();

homeworkRouter.get('/:id');
homeworkRouter.post('/');

// Obtener todas las tareas de un grupo
// Obtener todas las tareas de un usuario

export default homeworkRouter;