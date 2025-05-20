import { Router } from 'express';
import * as crypto from 'crypto';
import { TutorialModel } from '../model/TutorialModel';

export function tutorialRoutes(Tutorials: TutorialModel) {
  const router = Router();

  router.get('/app/tutorials', async (req, res) => {
    await Tutorials.retrieveAllTutorials(res);
  });
  router.get('/app/tutorials/:tutorialId', async (req, res) => {
    await Tutorials.retrieveTutorial(res, req.params.tutorialId);
  });
  router.post('/app/tutorials', async (req, res) => {
    const id = req.body.tutorialId || crypto.randomBytes(8).toString('hex');
    const jsonObj = { ...req.body, tutorialId: id };
    await Tutorials.createTutorial(res, jsonObj);
  });

  return router;
}