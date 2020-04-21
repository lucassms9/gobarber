import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
