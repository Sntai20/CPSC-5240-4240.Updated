"use strict";
// src/GooglePassport.ts
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
class GooglePassport {
    constructor() {
        this.clientId = process.env.OAUTH_CLIENT_ID;
        this.secretId = process.env.OAUTH_CLIENT_SECRET;
        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: '/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            console.log('Inside Google strategy, profile:', profile);
            process.nextTick(() => {
                // Simply pass the profile object through
                return done(null, profile);
            });
        }));
        passport.serializeUser((user, done) => {
            done(null, user);
        });
        passport.deserializeUser((user, done) => {
            done(null, user);
        });
    }
}
exports.default = GooglePassport;
//# sourceMappingURL=GooglePassport.js.map