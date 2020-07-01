import { Router } from 'express';
import audio from './audio';
import fileUpload from './fileUpload';
import livereport from './livereport';
import pastorblog from './pastorblog';
import prayerrequest from './prayerrequest';
import prayerwall from './prayerwall';
import thumbnail from './thumbnail';
import transcribe from './transcribe';
import video from './video';

const routes = Router();

routes.use('/livereports', livereport);
routes.use('/pastorblogs', pastorblog);
routes.use('/prayer-requests', prayerrequest);
routes.use('/prayerwalls', prayerwall);
routes.use('/upload', fileUpload);

routes.use('/audios', audio);
routes.use('/videos', video);
routes.use('/transcribes', transcribe);

routes.use('/thumbnails', thumbnail);

export default routes;
