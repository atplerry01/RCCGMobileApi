import { Router } from 'express';
import PrayerWallController from '../controllers/PrayerWallController';

const router = Router();

router.get('/groups', PrayerWallController.allGroups);
router.post('/groups', PrayerWallController.createWallGroup);
router.get('/groups/division/:id', PrayerWallController.getDivisionGroup);
router.delete('/group/:id', PrayerWallController.deleteGroups);

router.get('/:id', PrayerWallController.getOneById);
router.get('/group/:id', PrayerWallController.allWallByGroupId);
router.post('/', PrayerWallController.createWall);
router.get('/divisionId/:id', PrayerWallController.wallByDivisionId);

export default router;
