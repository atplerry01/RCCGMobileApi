import { Router } from 'express';
import PrayerRequestController from '../controllers/PrayerRequestController';

const router = Router();

router.get('/', PrayerRequestController.all);
router.get('/:id', PrayerRequestController.getOneById);
router.post('/', PrayerRequestController.create);
router.patch('/:id', PrayerRequestController.update);
router.patch('/:id', PrayerRequestController.treatPrayerRequest);
router.delete('/:id', PrayerRequestController.delete);

export default router;
