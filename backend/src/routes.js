import { Router } from "express";

import StudentsController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/students', StudentsController.store);
routes.post('/session', SessionController.store);


export default routes;
