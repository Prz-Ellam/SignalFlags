import { Router } from 'express';
import HomeworkController from '../controllers/homework.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { multerUpload2 } from '../configuration/multer.js';
const homeworkRouter = Router();

// Obtener una tarea
// [GET] /api/v1/homeworks/:id
homeworkRouter.get('/:id', authMiddleware, HomeworkController.findOne);

homeworkRouter.post('/:id/delivers', multerUpload2.array('files'), authMiddleware, HomeworkController.createDeliver);

export default homeworkRouter;