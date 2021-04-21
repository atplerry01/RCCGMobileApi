import { Router } from 'express';
import PrayerRoomController from '../controllers/PrayerRoomController';

const router = Router();

router.get('/', PrayerRoomController.all);
router.get('/:id', PrayerRoomController.getOneById);
router.post('/', PrayerRoomController.create);
router.delete('/:id', PrayerRoomController.delete);

router.get('/:roomId/users', PrayerRoomController.getUserByRoomId);
router.post('/user', PrayerRoomController.createRoomUser);
router.get('/room/:roomId/users', PrayerRoomController.getRoomUserByRoomId);
router.get('/room/:roomId/user/:userId', PrayerRoomController.getAmInRoom);

router.get('/division/:id', PrayerRoomController.roomByDivisionId);

export default router;
