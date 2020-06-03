import { Router } from 'express';
import TestController from '../controllers/TestController';

const router = Router();

router.get('/', TestController.all);
router.get('/me', TestController.me);

export default router;
