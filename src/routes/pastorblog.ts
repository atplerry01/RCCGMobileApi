import { Router } from 'express';
import PastorBlogController from '../controllers/PastorBlogController';

const router = Router();

router.get('/', PastorBlogController.all);
router.get('/division/:divisionAlias', PastorBlogController.blogByDivision);
router.get('/:id', PastorBlogController.getOneById);
router.get('/divisionId/:id', PastorBlogController.getBlogByDivisionId);
router.post('/', PastorBlogController.create);
router.post('/blog/audio', PastorBlogController.createBlogAudio);
router.post('/blog/video', PastorBlogController.createBlogVideo);
router.patch('/:id', PastorBlogController.update);
router.delete('/:id', PastorBlogController.delete);

export default router;
