import express from 'express';

const groupRouter = express.Router();

groupRouter.post('/', () => {});
groupRouter.get('/:id', () => {});
groupRouter.put('/:id', () => {});
groupRouter.delete('/:id', () => {});

export default groupRouter;