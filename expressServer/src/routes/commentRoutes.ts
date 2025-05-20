import { Router } from 'express';
import { CommentModel } from '../model/CommentModel';

export function commentRoutes(Comments: CommentModel) {
  const router = Router();

  router.get('/app/comments', async (req, res) => {
    await Comments.retrieveAll(res);
  });
  router.get('/app/comments/:id', async (req, res) => {
    await Comments.retrieveByID(res, req.params.id);
  });
  router.post('/app/comments', async (req, res) => {
    await Comments.createComment(res, req.body);
  });

  return router;
}