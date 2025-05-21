import * as chai from 'chai';
import { request, default as chaiHttp } from 'chai-http';
import { expect } from 'chai';

chai.use(chaiHttp);

const baseUrl = 'http://localhost:8080';

describe('CommentModel API endpoints (E2E)', () => {

  describe('POST /app/comments (E2E)', () => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const uniqueUserId = `user-${uniqueId}`;
    const uniqueNoteId = `note-${uniqueId}`;
    it('should create a comment and return it', async () => {
      const newComment = {
        commentId: uniqueId,
        noteId: uniqueNoteId,
        userId: uniqueUserId,
        text: 'This is a test comment.',
        votesUp: 0,
        votesDown: 0,
      };
      const res = await request.execute(baseUrl)
        .post(`/app/communityNotes/${newComment.noteId}/comments`)
        .send(newComment)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.commentId).to.equal(newComment.commentId);
      expect(res.body.text).to.equal(newComment.text);
    });
  });

  describe('GET /app/comments by commentId (Single Object) (E2E)', () => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const uniqueUserId = `user-${uniqueId}`;
    const uniqueNoteId = `note-${uniqueId}`;
    it('should return status 200 for GET /app/comments/:commentId', done => {
      const newComment = {
        commentId: uniqueId,
        noteId: uniqueNoteId,
        userId: uniqueUserId,
        text: 'This is a test comment.',
        votesUp: 0,
        votesDown: 0,
      };

      request.execute(baseUrl)
        .get('/app/comments/12345')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /app/communityNotes/:noteId/comments by noteId (Single Object) (E2E)', () => {
      const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const uniqueUserId = `user-${uniqueId}`;
      const uniqueNoteId = `note-${uniqueId}`;
      it('should return status 200 for GET /app/communityNotes/:noteId/comments', async () => {
        const newComment = {
          commentId: uniqueId,
          noteId: uniqueNoteId,
          userId: uniqueUserId,
          text: 'This is a test comment.',
          votesUp: 0,
          votesDown: 0,
        };

        // First, create the comment and wait for it to finish
        const postRes = await request.execute(baseUrl)
          .post(`/app/communityNotes/${newComment.noteId}/comments`)
          .send(newComment)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');
        expect(postRes).to.have.status(201);

        const getRes = await request.execute(baseUrl)
          .get(`/app/communityNotes/${newComment.noteId}/comments`);
        expect(getRes).to.have.status(200);
        expect(getRes.body).to.be.an('array');
        expect(getRes.body[0].commentId).to.equal(newComment.commentId);
      });
    });
});
