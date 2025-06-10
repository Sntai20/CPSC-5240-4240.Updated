"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const TutorialModel_1 = require("./model/TutorialModel");
const CommentModel_1 = require("./model/CommentModel");
const CommunityNoteModel_1 = require("./model/CommunityNoteModel");
const tutorialRoutes_1 = require("./routes/tutorialRoutes");
const commentRoutes_1 = require("./routes/commentRoutes");
const communityNotesRoutes_1 = require("./routes/communityNotesRoutes");
const UserModel_1 = require("./model/UserModel");
const userRoutes_1 = require("./routes/userRoutes");
//import * as passport from 'passport';
const GooglePassport_1 = require("./GooglePassport");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
class App {
    constructor(mongoDBConnection) {
        this.googlePassportObj = new GooglePassport_1.default();
        this.expressApp = express();
        this.middleware();
        this.Tutorials = new TutorialModel_1.TutorialModel(mongoDBConnection);
        this.Comments = new CommentModel_1.CommentModel(mongoDBConnection);
        this.CommunityNotes = new CommunityNoteModel_1.CommunityNoteModel(mongoDBConnection);
        this.Users = new UserModel_1.UserModel(mongoDBConnection);
        Promise.all([
            this.Tutorials.createModel(),
            this.Comments.createModel(),
            this.CommunityNotes.createModel(),
            this.Users.createModel()
        ]).then(() => {
            this.routes();
        }).catch(err => {
            console.error('Failed to connect to MongoDB', err);
        });
    }
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.expressApp.use(session({ secret: 'keyboard cat' }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }
    validateAuth(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            console.log(JSON.stringify(req.user));
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    }
    routes() {
        this.expressApp.use('/', (0, tutorialRoutes_1.tutorialRoutes)(this.Tutorials));
        this.expressApp.use('/', (0, commentRoutes_1.commentRoutes)(this.Comments));
        this.expressApp.use('/', (0, communityNotesRoutes_1.communityNotesRoutes)(this.CommunityNotes));
        this.expressApp.use('/', (0, userRoutes_1.userRoutes)(this.Users));
        // static pages
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map