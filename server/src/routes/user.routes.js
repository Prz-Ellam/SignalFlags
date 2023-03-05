import express from 'express';
import UserController from '../controllers/user.controller.js';
const router = express.Router();

router.post('/login', UserController.login);

router.post('/', UserController.createUser);
router.get('/:id', UserController.findOneUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;