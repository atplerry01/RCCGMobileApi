import { Router } from 'express';
import PrayerWallController from '../controllers/PrayerWallController';

const router = Router();

router.get('/', PrayerWallController.all);
router.get('/:id', PrayerWallController.getOneById);
router.post('/', PrayerWallController.create);
router.post('/addUser', PrayerWallController.createWallUser);
router.patch('/:id', PrayerWallController.update);
router.delete('/:id', PrayerWallController.delete);

export default router;
