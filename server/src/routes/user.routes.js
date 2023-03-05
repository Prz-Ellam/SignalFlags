import express from 'express';
import { createUser } from '../controllers/user.controller';
const router = express.Router();

router.post('/', createUser);

router.get('/:id', (_req, res) => {

});

router.put('/:id', (_req, res) => {

});

router.delete('/:id', (_req, res) => {

});

export default router;