import { Router } from 'express';
import HomeworkController from '../controllers/homework.controller.js';
const homeworkRouter = Router();

/*
    Crear una tarea
    Actualizar una tarea
    Eliminar una tarea
    Obtener una tarea
    Obtener todas las tareas de un grupo
    Obtener todas las tareas de un usuario

    Terminar una tarea (finish)
*/

// Obtener una tarea
// [GET] /api/v1/homeworks/:id
homeworkRouter.get('/:id', HomeworkController.findOne);

homeworkRouter.post('/');

homeworkRouter.put('/:id/finish');

homeworkRouter.put('/:id');
homeworkRouter.delete('/:id');

export default homeworkRouter;