import { Router } from 'express';
import GroupController from '../controllers/group.controller.js';
import HomeworkController from '../controllers/homework.controller.js';
import PostController from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateCreateGroup } from '../middlewares/validators/group.validator.js';

const groupRouter = Router();

/*
GET     /api/v1/groups/:id
POST    /api/v1/groups
POST    /api/v1/groups/:id/avatar
PUT     /api/v1/groups/:id
PUT     /api/v1/groups/:id/avatar
DELETE  /api/v1/groups/:id
#POST    /api/v1/groups/:groupId/members/:userId
#DELETE  /api/v1/groups/:groupId/members/:userId
GET     /api/v1/groups/:id/members
GET     /api/v1/groups/:id/subgroups
GET     /api/v1/groups/:id/homeworks
GET     /api/v1/groups/:id/posts
*/

// Obtener un grupo por id
// [GET] /api/v1/groups/:id
groupRouter.get('/:id', GroupController.findOne);

// Agregar un grupo
// [POST] /api/v1/groups
groupRouter.post('/', authMiddleware, validateCreateGroup, GroupController.create);

// Asigna una imagen a un grupo
// [POST] /api/v1/groups/:id/avatar
groupRouter.post('/:id/avatar');

// Actualizar un grupo
// [PUT] /api/v1/groups/:id
groupRouter.put('/:id', GroupController.update);

// Actualiza la imagen de un grupo
// [PUT] /api/v1/groups/:id/avatar
groupRouter.put('/:id/avatar');

// Eliminar un grupo
// [DELETE] /api/v1/groups/:id
groupRouter.delete('/:id', GroupController.delete);

// Buscar todos los miembros de un grupo
// [GET] /api/v1/groups/:id/members
groupRouter.get('/:id/members', GroupController.findMembers);

// Buscar todas las tareas de un grupo
// [GET] /api/v1/groups/:id/homeworks
groupRouter.get('/:id/homeworks', GroupController.findHomeworks);

// Obtener todos los subgrupos de un grupo
// [GET] /api/v1/groups/:id/subgroups
groupRouter.get('/:id/subgroups', GroupController.findSubgroups);

// Obtener todos los posts de un grupo
// [GET] /api/v1/groups/:id/posts
groupRouter.get('/:id/posts', GroupController.findPosts);

// Crea un post
// [POST] /api/v1/posts
groupRouter.post('/:groupId/posts', authMiddleware, PostController.create);

// Crea una tarea
// [POST] /api/v1/homeworks
groupRouter.post('/:groupId/homeworks', authMiddleware, HomeworkController.create);


export default groupRouter;