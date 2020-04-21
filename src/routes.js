import { Router } from 'express';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

const routes = new Router();

routes.get('/', UserController.store);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
export default routes;
