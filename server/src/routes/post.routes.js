import { Router } from 'express';
import PostController from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const postRouter = Router();

/*
    Crear una publicacion
    Actualizar una publicación
    Eliminar una publicacion
    Obtener todas las publicaciones de un grupo

    Responder una publicación
*/

postRouter.get('/:id');

// Actualiza un post
// [PUT] /api/v1/posts/:id
postRouter.put('/:id');

// Elimina un post
// [DELETE] /api/v1/posts/:id
postRouter.delete('/:id');

// Responder una publicación
// [POST] /api/v1/posts/:id/reply
postRouter.post('/:id/reply', authMiddleware, PostController.reply);

// Eliminar una respuesta
// [DELETE] /api/v1/posts/:id/reply
postRouter.delete('/:postId/reply/:replyId');

export default postRouter;