import { Router } from 'express';
import FileUploadController from '../controllers/FileUploadController';

const router = Router();

router.get('/', FileUploadController.all);
router.get('/me', FileUploadController.me);
router.post('/images', FileUploadController.imageUpload);
router.post('/videos', FileUploadController.videoUpload);
router.post('/multiple', FileUploadController.multipleUpload);

export default router;
