import { Router } from 'express';
import VideoController from '../controllers/VideoController';

const router = Router();

router.get('/', VideoController.all);
router.get('/:id', VideoController.getOneById);
router.post('/', VideoController.create);
router.patch('/:id', VideoController.update);
router.delete('/:id', VideoController.delete);

export default router;
