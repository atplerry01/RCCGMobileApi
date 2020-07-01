import { Router } from 'express';
import AudioController from '../controllers/AudioController';

const router = Router();

router.get('/', AudioController.all);
router.get('/:id', AudioController.getOneById);
router.post('/', AudioController.create);
router.patch('/:id', AudioController.update);
router.delete('/:id', AudioController.delete);

export default router;
