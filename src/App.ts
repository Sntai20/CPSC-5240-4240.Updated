import * as express from 'express';
import * as bodyParser from 'body-parser';
import { TutorialModel } from './model/TutorialModel';
import { CommentModel } from './model/CommentModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  public expressApp: express.Application;
  public Tutorials: TutorialModel;
  public Comments: CommentModel;

  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();

    this.Tutorials = new TutorialModel(mongoDBConnection);
    this.Comments = new CommentModel(mongoDBConnection);

    Promise.all([
      this.Tutorials.createModel(),
      this.Comments.createModel()
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
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    const router = express.Router();

    // TutorialModel endpoints
    router.get('/app/tutorials', async (req, res) => {
      await this.Tutorials.retrieveAllTutorials(res);
    });
    router.get('/app/tutorials/:tutorialId', async (req, res) => {
      await this.Tutorials.retrieveTutorial(res, req.params.tutorialId);
    });
    router.post('/app/tutorials', async (req, res) => {
      const id = req.body.tutorialId || crypto.randomBytes(8).toString('hex');
      const jsonObj = { ...req.body, tutorialId: id };
      await this.Tutorials.createTutorial(res, jsonObj);
    });

    // CommentModel endpoints
    router.get('/app/comments', async (req, res) => {
      await this.Comments.retrieveAll(res);
    });
    router.get('/app/comments/:id', async (req, res) => {
      await this.Comments.retrieveByID(res, req.params.id);
    });
    router.post('/app/comments', async (req, res) => {
      await this.Comments.createComment(res, req.body);
    });

    // Static file routes
    this.expressApp.use('/', router);
    this.expressApp.use('/', express.static(__dirname + '/pages'));
    // this.expressApp.use('/tutorial', express.static(__dirname + '/pages/tutorial'));
  }
}

export { App };