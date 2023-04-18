import { Router } from 'express';
import HomeworkController from '../controllers/homework.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { multerUpload2 } from '../configuration/multer.js';
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
homeworkRouter.get('/:id', authMiddleware, HomeworkController.findOne);

homeworkRouter.post('/');

homeworkRouter.put('/:id/finish');

homeworkRouter.put('/:id');
homeworkRouter.delete('/:id');

homeworkRouter.post('/:id/delivers', multerUpload2.array('files'), authMiddleware, HomeworkController.createDeliver);

export default homeworkRouter;