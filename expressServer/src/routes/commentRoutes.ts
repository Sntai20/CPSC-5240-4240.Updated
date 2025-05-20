import { Router } from 'express';
import { CommentModel } from '../model/CommentModel';

export function commentRoutes(Comments: CommentModel) {
  const router = Router();

  router.get('/app/communityNotes/:noteId/comments', async (req, res) => {
    await Comments.retrieveByNoteID(res, req.params.noteId);;
  });
  router.get('/app/comments/:commentId', async (req, res) => {
    await Comments.retrieveByID(res, req.params.commentId);
  });
  router.post('/app/communityNotes/:noteId/comments', async (req, res) => {
    await Comments.createComment(res, req.body);
  });

  return router;
}