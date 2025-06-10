import { Router } from 'express';
import { UserModel } from '../model/UserModel';
import passport = require('passport');
import * as crypto from 'crypto';

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
      failureRedirect: '/login',
      session: true
    }),
    (req, res) => {
      // On success, redirect to your front-end
      res.redirect('http://localhost:4200/');
    }
  );


  router.get('/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get('/auth/google/callback', (req, res, next) => {
        passport.authenticate('google', { failureRedirect: '/' }, async (err, user, info) => {
          if (err || !user) {
            return res.redirect('/');
          }
      
          // Establish the login session
          req.login(user, async (loginErr) => {
            if (loginErr) {
              return next(loginErr);
            }
      
            console.log("Successfully authenticated user and returned to callback page.");
            try {
              let dbUser = await this.Users.retrieveUserByEmail(user.emails[0].value);
              console.log(dbUser);
              if (dbUser == null) {
                const id = crypto.randomBytes(16).toString("hex");
                const newUser = {
                  userId: id,
                  name: user.displayName,
                  email: user.emails[0].value,
                };
                dbUser = await this.Users.model.create([newUser]);
                console.log(dbUser);
                console.log("Created new user..");
              }
              console.log("Redirecting to Angular frontend...");
              console.log("Setting user id in cache -- ", dbUser.userId);
              return res.redirect(`http://localhost:4200/#/?userId=${dbUser.userId}`);
            } catch (e) {
              console.error("Error handling user:", e);
              return res.redirect('/');
            }
          });
        })(req, res, next);
      });

  return router;
}
