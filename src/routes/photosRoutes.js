import {Router} from 'express';
import { createPhotoController, deletePhotoController, getAllPhotosController, getSinglePhotoController, updatePhotoControllers, updatePhotoUrlControllers } from '../controllers/photosControllers.js';

const photoRouter=Router();

photoRouter.post('/photos', createPhotoController)

photoRouter.get('/photos', getAllPhotosController)

photoRouter.get('/photos/single/:UserID', getSinglePhotoController)

photoRouter.put('/photos/update/:UserID', updatePhotoControllers)

photoRouter.patch('/photos/patch/:UserID', getAllPhotosController)

photoRouter.delete('/photos/delete/:UserID', deletePhotoController)


export default photoRouter;