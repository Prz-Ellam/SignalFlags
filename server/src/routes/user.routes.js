import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateCreateUser } from '../middlewares/validators/user.validator.js';
const userRouter = Router();

userRouter.post('/auth', UserController.userLoginController);

userRouter.post('/', validateCreateUser, UserController.createUser);
userRouter.get('/:id', UserController.findOneUser);
userRouter.patch('/:id', authMiddleware, UserController.userUpdateController);
//userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;