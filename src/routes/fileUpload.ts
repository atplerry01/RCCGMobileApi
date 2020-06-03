import { Router } from 'express';
import FileUploadController from '../controllers/FileUploadController';

const router = Router();

router.get('/', FileUploadController.all);
router.get('/me', FileUploadController.me);
router.post('/single', FileUploadController.singleUpload);
router.post('/multiple', FileUploadController.multipleUpload);

export default router;
