import { Router } from "express";
import Users from './app/models/Users';

const routes = new Router();

routes.get("/", async (req, res) => {
  const user = await Users.create({
    name: 'ADMIN TESTE',
    email: 'teste@admin.com',
    password_hash: '12312321312'
  });
  return res.json(user);
});

export default routes;
