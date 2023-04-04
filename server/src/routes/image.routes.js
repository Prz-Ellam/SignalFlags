import { Router } from 'express';
import { multerUpload } from '../configuration/multer.js';
import { createImage } from '../controllers/image.controller.js';
const imageRouter = Router();

imageRouter.post('/', multerUpload.single('image'), createImage);

export default imageRouter;