import { Router } from 'express';
import { UserModel } from '../model/UserModel';

export function userRoutes(Users: UserModel) {
  const router = Router();

  // Signup
  router.post('/app/signup', async (req, res) => {
    await Users.createUser(req.body, res);
  });

  // Login
  router.post('/app/login', async (req, res) => {
    await Users.loginUser(req, res);
  });

  return router;
}
