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
const GooglePassport_1 = require("./GooglePassport");
const cors = require("cors");
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
        // CORS configuration - MUST come before other middleware
        this.expressApp.use(cors({
            origin: 'http://localhost:4200', // Your Angular app URL
            credentials: true, // Allow cookies/session to be sent
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
        }));
        // Body parser middleware
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        // Cookie parser middleware
        this.expressApp.use(cookieParser());
        // Session middleware - MUST come before passport
        this.expressApp.use(session({
            secret: 'your-secret-key-change-this-in-production', // Change this to a secure secret
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false, // Set to true if using HTTPS
                maxAge: 24 * 60 * 60 * 1000, // 24 hours
                httpOnly: true // Prevent XSS attacks
            }
        }));
        // Passport middleware - MUST come after session
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
        this.expressApp.use('/', express.static(__dirname + '/dist'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map