import { Router } from 'express';
import test from './test';

const routes = Router();

routes.use('/tests', test);

export default routes;
