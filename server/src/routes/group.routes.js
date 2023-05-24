import { Router } from 'express';
import { multerUpload, multerUpload2 } from '../configuration/multer.js';
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
groupRouter.get('/:id', authMiddleware, GroupController.findOne);

// Agregar un grupo
// [POST] /api/v1/groups
groupRouter.post('/', authMiddleware, validateCreateGroup, GroupController.create);


// Asigna una imagen a un grupo
// [POST] /api/v1/groups/:id/avatar
groupRouter.post('/:id/avatar', authMiddleware, multerUpload.single('avatar'), GroupController.addAvatar);

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
groupRouter.get('/:id/members', authMiddleware, GroupController.findMembers);

// Buscar todas las tareas de un grupo
// [GET] /api/v1/groups/:id/homeworks
groupRouter.get('/:id/homeworks', authMiddleware, HomeworkController.findByGroup);
groupRouter.get('/:id/homeworks/pending', authMiddleware, HomeworkController.findPendingByGroup);
groupRouter.get('/:id/homeworks/expired', authMiddleware, HomeworkController.findExpiredByGroup);

// Obtener todos los subgrupos de un grupo
// [GET] /api/v1/groups/:id/subgroups
groupRouter.get('/:id/subgroups', authMiddleware, GroupController.findSubgroups);

groupRouter.post('/:id/subgroups', authMiddleware, GroupController.createSubgroup);

groupRouter.post('/:id/email', authMiddleware, GroupController.email);

// Obtener todos los posts de un grupo
// [GET] /api/v1/groups/:id/posts
groupRouter.get('/:id/posts', authMiddleware, GroupController.findPosts);

// Crea un post
// [POST] /api/v1/posts
groupRouter.post('/:id/posts', authMiddleware, PostController.create);

groupRouter.post('/:id/posts/upload', authMiddleware, multerUpload2.array('files'), 
(req, res, next) => {
    try {
        req.body = JSON.parse(req.body.payload);
        next();
    }
    catch (exception) {
        return res.json('Error');
    }
}, 
PostController.create);


// Crea una tarea
// [POST] /api/v1/homeworks
groupRouter.post('/:groupId/homeworks', authMiddleware, HomeworkController.create);

// Crea un subgrupo
// [POST] /api/v1/id/subgroups
groupRouter.post('/:id/subgroups', authMiddleware, GroupController.createSubgroup);

export default groupRouter;