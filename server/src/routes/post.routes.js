import express from 'express';
const postRouter = express.Router();

postRouter.get('/:id', () => {});
postRouter.post('/', () => {});
postRouter.put('/:id', () => {});
postRouter.delete('/:id', () => {});

export default postRouter;