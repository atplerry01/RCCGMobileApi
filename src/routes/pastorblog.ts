import { Router } from 'express';
import PastorBlogController from '../controllers/PastorBlogController';

const router = Router();

router.get('/', PastorBlogController.all);
router.get('/:id', PastorBlogController.getOneById);
router.post('/', PastorBlogController.create);
router.patch('/:id', PastorBlogController.update);
router.delete('/:id', PastorBlogController.delete);

export default router;
