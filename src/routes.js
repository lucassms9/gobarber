import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import FileController from './app/controller/FileController';
import ProviderController from './app/controller/ProviderController';
import AppointmentController from './app/controller/AppointmentController';
import ScheduleController from './app/controller/ScheduleController';
import NotificationController from './app/controller/NotificationController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);
routes.get('/schedule', ScheduleController.index);
routes.get('/providers', ProviderController.index);
routes.get('/notification', NotificationController.index);
routes.put('/notification/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);
export default routes;
