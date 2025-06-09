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

class App {
  public expressApp: express.Application;
  public Tutorials: TutorialModel;
  public Comments: CommentModel;
  public CommunityNotes: CommunityNoteModel;
  public Users: UserModel;

  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();

    this.Tutorials = new TutorialModel(mongoDBConnection);
    this.Comments = new CommentModel(mongoDBConnection);
    this.CommunityNotes = new CommunityNoteModel(mongoDBConnection);
    this.Users = new UserModel(mongoDBConnection);

    Promise.all([
      this.Tutorials.createModel(),
      this.Comments.createModel(),
      this.CommunityNotes.createModel()
    ]).then(() => {
      this.routes();
    }).catch(err => {
      console.error('Failed to connect to MongoDB', err);
    });
  }

  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
  }

  private routes(): void {
    this.expressApp.use('/', tutorialRoutes(this.Tutorials));
    this.expressApp.use('/', commentRoutes(this.Comments));
    this.expressApp.use('/', communityNotesRoutes(this.CommunityNotes));
    this.expressApp.use('/', userRoutes(this.Users));

    this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
    this.expressApp.use('/', express.static(__dirname + '/dist'));

  }
}

export { App };
