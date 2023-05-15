import { Router } from 'express';
import { memoryUpload, multerUpload } from '../configuration/multer.js';
import { createImage, createImageFirebase } from '../controllers/image.controller.js';
const imageRouter = Router();

imageRouter.post('/', multerUpload.single('image'), createImage);
imageRouter.post('/firebase', memoryUpload.single('image'), createImageFirebase);

export default imageRouter;