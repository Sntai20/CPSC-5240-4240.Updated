import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';

import { TutorialModel }from './model/TutorialModel';
import { CommentModel } from './model/CommentModel';
import { CommunityNoteModel } from './model/CommunityNoteModel';

class App {
  public expressApp: express.Application;
  public Tutorials:      TutorialModel;
  public Comments:       CommentModel;
  public CommunityNotes: CommunityNoteModel;

  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();

    this.Tutorials      = new TutorialModel(mongoDBConnection);
    this.Comments       = new CommentModel(mongoDBConnection);
    this.CommunityNotes = new CommunityNoteModel(mongoDBConnection);

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
    const router = express.Router();

    // ── TutorialModel endpoints ──
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

    //CommunityNoteModel endpoints
    router.get('/app/communityNotes', async (req, res) => {
      await this.CommunityNotes.retrieveAll(res);
    });
    router.get('/app/communityNotes/tutorial/:tutorialId', async (req, res) => {
        await this.CommunityNotes.retrieveByTutorialID(
          res,
          req.params.tutorialId
        );
      }
    );
    router.get(
      '/app/communityNotes/:noteId',
      async (req, res) => {
        await this.CommunityNotes.retrieveByID(res, req.params.noteId);
      }
    );
    router.post('/app/communityNotes', async (req, res) => {
      const id = req.body.noteId || crypto.randomBytes(8).toString('hex');
      const jsonObj = { ...req.body, noteId: id };
      await this.CommunityNotes.createCommunityNote(res, jsonObj);
    });

    //CommentModel endpoints
    router.get(
      '/app/communityNotes/:noteId/comments',
      async (req, res) => {
        await this.Comments.retrieveByNoteID(res, req.params.noteId);
      }
    );

    router.post('/app/communityNotes/:noteId/comments', async (req, res) => {
        const id = req.body.commentId || crypto.randomBytes(8).toString('hex');
        const payload = {...req.body, commentId: id, noteId: req.params.noteId};
        await this.Comments.createComment(res, payload);
      }
    );

    router.get(
      '/app/comments/:commentId',
      async (req, res) => {
        await this.Comments.retrieveByID(res, req.params.commentId);
      }
    );

    // Static file routes
    this.expressApp.use('/', router);
    this.expressApp.use('/', express.static(__dirname + '/pages'));
  }
}

export { App };
