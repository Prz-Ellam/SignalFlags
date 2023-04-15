import { Router } from 'express';
import GroupController from '../controllers/group.controller.js';

const groupRouter = Router();

groupRouter.post('/', validateCreateGroup, GroupController.createGroupController);
groupRouter.get('/', GroupController.findAllPublicGroupsController);
groupRouter.get('/:id', GroupController.findUserGroupsController);

groupRouter.put('/:id');
groupRouter.delete('/:id');

// Buscar todos los grupos de un usuario

export default groupRouter;