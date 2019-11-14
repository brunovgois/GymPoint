import { Router } from "express";

import StudentsController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.use(authMiddleware);

routes.post('/students', StudentsController.store);
routes.put('/student/:id', StudentsController.update);

routes.post('/plan', PlanController.store);
routes.get('/plan', PlanController.index);
routes.put('/plan/:id', PlanController.update);
routes.delete('/plan/:id', PlanController.delete);

routes.post('/enrollment', EnrollmentController.store);
routes.get('/enrollment', EnrollmentController.index);
routes.put('/enrollment/:id', EnrollmentController.update);
routes.delete('/enrollment/:id', EnrollmentController.delete);


export default routes;
