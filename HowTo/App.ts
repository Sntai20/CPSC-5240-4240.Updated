import * as express from 'express';
import * as bodyParser from 'body-parser';
import { TutorialModel } from './model/TutorialModel';
<<<<<<< HEAD
=======
import { CommentModel } from './model/CommentModel';
>>>>>>> 13f15665bb2c40377308744243fca4ef7f45651d
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  public expressApp: express.Application;
<<<<<<< HEAD
  public Tutorials:TutorialModel;
=======
  public Tutorials: TutorialModel;
  public Comments: CommentModel;
>>>>>>> 13f15665bb2c40377308744243fca4ef7f45651d

  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
<<<<<<< HEAD
    this.Tutorials = new TutorialModel(mongoDBConnection);
    this.Tutorials.createModel().then(() => {
      this.routes();  // Only register routes after MongoDB is connected
    }).catch((err) => {
      console.error("Failed to connect to MongoDB", err);
=======

    // Instantiate models
    this.Tutorials = new TutorialModel(mongoDBConnection);
    this.Comments = new CommentModel(mongoDBConnection);

    // Only register routes after models have connected
    Promise.all([
      this.Tutorials.createModel(),
      this.Comments.createModel()
    ]).then(() => {
      this.routes();
    }).catch(err => {
      console.error('Failed to connect to MongoDB', err);
>>>>>>> 13f15665bb2c40377308744243fca4ef7f45651d
    });
  }

  // Configure Express middleware.
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
<<<<<<< HEAD
    let router = express.Router();

    // Get all tutorials
    router.get('/app/tutorials', async (req, res) => {
      console.log('Query All tutorials');
      await this.Tutorials.retrieveAllTutorials(res);
    });

    // Get tutorial by ID
    router.get('/app/tutorials/:tutorialId', async (req, res) => {
      var id = req.params.tutorialId;
      console.log('Query single tutorial with id: ' + id);
      await this.Tutorials.retrieveTutorial(res, id);
    });

    // Create new tutorial
    router.post('/app/tutorials', async (req, res) => {
      const id = req.body.tutorialId || crypto.randomBytes(8).toString("hex");
      console.log('Creating new tutorial');
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.tutorialId = id;
      
      await this.Tutorials.createTutorial(res, jsonObj);
=======
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
>>>>>>> 13f15665bb2c40377308744243fca4ef7f45651d
    });

    // Static file routes
    this.expressApp.use('/', router);
<<<<<<< HEAD

    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    this.expressApp.use('/tutorial', express.static(__dirname+'/pages/tutorial'));
=======
    this.expressApp.use('/app/json', express.static(__dirname + '/app/json'));
    this.expressApp.use('/images', express.static(__dirname + '/img'));
    this.expressApp.use('/', express.static(__dirname + '/pages'));
    this.expressApp.use('/tutorial', express.static(__dirname + '/pages/tutorial'));
>>>>>>> 13f15665bb2c40377308744243fca4ef7f45651d
  }
}

export { App };