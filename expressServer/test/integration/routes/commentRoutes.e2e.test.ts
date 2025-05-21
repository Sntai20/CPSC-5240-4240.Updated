import * as chai from 'chai';
import { request, default as chaiHttp } from 'chai-http';
import { expect } from 'chai';

chai.use(chaiHttp);

describe('CommentModel API endpoints (E2E)', () => {
  var baseUrl = 'http://localhost:8080';
  describe('POST /app/comments (E2E)', () => {
    it('should create a comment and return it', async () => {
      const newComment = {
        commentId: '12345',
        noteId: 'note-001',
        userId: 'user-001',
        text: 'This is a test comment.',
        votesUp: 0,
        votesDown: 0,
      };
      const res = await request.execute(baseUrl)
        .post('/app/comments')
        .send(newComment)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.commentId).to.equal(newComment.commentId);
      expect(res.body.text).to.equal(newComment.text);
    });
  });

  describe('GET /app/comments (List Objects) (E2E)', () => {
    it('should return status 200 for GET /app/comments', done => {
      request.execute(baseUrl)
        .get('/app/comments')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.length.of.at.least(1);
          done();
        });
    });
  });

  describe('GET /app/comments (Single Object) (E2E)', () => {
    it('should return status 200 for GET /app/comments/:commentId', done => {
      request.execute(baseUrl)
        .get('/app/comments/12345')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
