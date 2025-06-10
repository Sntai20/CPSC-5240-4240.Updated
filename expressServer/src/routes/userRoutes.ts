import { Router } from 'express';
import { UserModel } from '../model/UserModel';
import * as passport from 'passport';



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

  router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

  // 2) Handle the callback
  router.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      session: true
    }),
    (req, res) => {
      // On success, redirect to your front-end
      res.redirect('http://localhost:4200/');
    }
  );



  return router;
}
