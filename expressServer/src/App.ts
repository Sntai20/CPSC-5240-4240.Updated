import * as express from 'express';
import * as bodyParser from 'body-parser';
import { TutorialModel } from './model/TutorialModel';
import { CommentModel } from './model/CommentModel';
import { CommunityNoteModel } from './model/CommunityNoteModel';
import { tutorialRoutes } from './routes/tutorialRoutes';
import { commentRoutes } from './routes/commentRoutes';
import { communityNotesRoutes } from './routes/communityNotesRoutes';
import { UserModel } from './model/UserModel';
import { userRoutes } from './routes/userRoutes';
import GooglePassportObj from './GooglePassport';
import * as cors from 'cors';
import { Request, Response, NextFunction } from 'express'

const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

class App {
  public expressApp: express.Application;
  public Tutorials: TutorialModel;
  public Comments: CommentModel;
  public CommunityNotes: CommunityNoteModel;
  public Users: UserModel;
  public googlePassportObj: GooglePassportObj;

  constructor(mongoDBConnection: string) {
    this.googlePassportObj = new GooglePassportObj();

    this.expressApp = express();
    this.middleware();
  
    this.Tutorials = new TutorialModel(mongoDBConnection);
    this.Comments = new CommentModel(mongoDBConnection);
    this.CommunityNotes = new CommunityNoteModel(mongoDBConnection);
    this.Users = new UserModel(mongoDBConnection);

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

  private middleware(): void {
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

  private validateAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.isAuthenticated()) {
      console.log("user is authenticated");
      console.log(JSON.stringify(req.user));
      return next();
    }
    console.log("user is not authenticated");
    res.redirect('/');
  }

  private routes(): void {
    this.expressApp.use('/', tutorialRoutes(this.Tutorials));
    this.expressApp.use('/', commentRoutes(this.Comments));
    this.expressApp.use('/', communityNotesRoutes(this.CommunityNotes));
    this.expressApp.use('/', userRoutes(this.Users));

    // static pages
    this.expressApp.use('/', express.static(__dirname + '/dist'));
  }
}

export { App };