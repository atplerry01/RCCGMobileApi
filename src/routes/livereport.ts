import { Router } from 'express';
import LiveReportController from '../controllers/LiveReportController';

const router = Router();

router.get('/', LiveReportController.all);
router.get('/type/:type', LiveReportController.reportByType);
router.get('/division/:divisionAlias/type/:type', LiveReportController.reportByDivision);
router.get('/:id', LiveReportController.getOneById);
router.get('/divisionId/:id/type/:type', LiveReportController.getReportByDivisionId);
router.post('/', LiveReportController.create);
router.patch('/:id', LiveReportController.update);
router.patch('/:id/approve', LiveReportController.updateApproval);
router.patch('/:id/reject', LiveReportController.updateRejection);
router.delete('/:id', LiveReportController.delete);

export default router;
