import { Router } from 'express';
import PostController from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const postRouter = Router();

// Responder una publicación
// [POST] /api/v1/posts/:id/reply
postRouter.post('/:id/reply', authMiddleware, PostController.reply);

export default postRouter;