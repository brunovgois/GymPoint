import { Router } from "express";

import StudentsController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/students', StudentsController.store);

export default routes;
