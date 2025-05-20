import { Router } from 'express';
import * as crypto from 'crypto';
import { CommunityNoteModel } from '../model/CommunityNoteModel';

export function communityNotesRoutes(CommunityNotes: CommunityNoteModel) {
  const router = Router();

  router.get('/app/communityNotes', async (req, res) => {
    await CommunityNotes.retrieveAll(res);
  });

  router.get('/app/communityNotes/tutorial/:tutorialId', async (req, res) => {
    await CommunityNotes.retrieveByTutorialID(res, req.params.tutorialId);
  });
  
  router.get('/app/communityNotes/:noteId', async (req, res) => {
    await CommunityNotes.retrieveByID(res, req.params.noteId);
  });
  
  router.post('/app/communityNotes', async (req, res) => {
    const id = req.body.noteId || crypto.randomBytes(8).toString('hex');
    const jsonObj = { ...req.body, noteId: id };
    await CommunityNotes.createCommunityNote(res, jsonObj);
  });

  return router;
}