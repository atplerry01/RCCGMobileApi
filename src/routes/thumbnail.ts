import { Router } from 'express';
import ThumbnailController from '../controllers/ThumbnailController';

const router = Router();

router.post('/image', ThumbnailController.image);


export default router;
