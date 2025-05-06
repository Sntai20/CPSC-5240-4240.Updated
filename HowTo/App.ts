import * as express from 'express';
import * as bodyParser from 'body-parser';
import { TutorialModel } from './model/TutorialModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Tutorials:TutorialModel;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.Tutorials = new TutorialModel(mongoDBConnection);
    this.Tutorials.createModel().then(() => {
      this.routes();  // Only register routes after MongoDB is connected
    }).catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use( (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
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
    });

    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    this.expressApp.use('/tutorial', express.static(__dirname+'/pages/tutorial'));
  }

}

export {App};