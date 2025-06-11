// src/GooglePassport.ts

import * as passport from 'passport';
import * as dotenv from 'dotenv';
dotenv.config();

const GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;

export default class GooglePassport {
  private clientId: string;
  private secretId: string;

  constructor() {
    this.clientId = process.env.OAUTH_CLIENT_ID!;
    this.secretId = process.env.OAUTH_CLIENT_SECRET!;

    passport.use(new GoogleStrategy(
      {
        clientID:     this.clientId,
        clientSecret: this.secretId,
        callbackURL:  '/auth/google/callback'
      },
      (accessToken: string, refreshToken: string, profile: any, done: any) => {
        console.log('Inside Google strategy, profile:', profile);
        process.nextTick(() => {
          // Simply pass the profile object through
           return done(null, profile);
        });
      }
    ));

    passport.serializeUser((user: any, done: any) => {
      done(null, user);
    });

    passport.deserializeUser((user: any, done: any) => {
      done(null, user);
    });
  }
}
