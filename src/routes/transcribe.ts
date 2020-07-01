import { Router } from 'express';
import TranscribeController from '../controllers/TranscribeController';

const router = Router();

router.get('/', TranscribeController.all);
router.get('/:id', TranscribeController.getOneById);
router.post('/', TranscribeController.create);
router.patch('/:id', TranscribeController.update);
router.delete('/:id', TranscribeController.delete);

export default router;
