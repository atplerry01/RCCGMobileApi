import { Router } from 'express';
import fileUpload from './fileUpload';
import livereport from './livereport';
import pastorblog from './pastorblog';
import prayerrequest from './prayerrequest';
import prayerwall from './prayerwall';
import test from './test';

const routes = Router();

routes.use('/tests', test);
routes.use('/livereports', livereport);
routes.use('/pastorblogs', pastorblog);
routes.use('/prayer-requests', prayerrequest);
routes.use('/prayerwalls', prayerwall);
routes.use('/file-upload', fileUpload);

export default routes;
