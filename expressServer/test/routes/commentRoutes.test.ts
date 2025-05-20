import { expect } from 'chai';
import * as supertest from 'supertest';
import { TutorialModelMock, CommentModelMock, CommunityNoteModelMock } from '../mocks/ModelMocks';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const proxyquire = require('proxyquire').noCallThru();

// Patch the App to use mocks
const AppPatched = proxyquire('../../src/App', {
  './model/TutorialModel': { TutorialModel: TutorialModelMock },
  './model/CommentModel': { CommentModel: CommentModelMock },
  './model/CommunityNoteModel': { CommunityNoteModel: CommunityNoteModelMock },
}).App;

describe('CommentModel endpoints', () => {
  let request: any;

  before(() => {
    const app = new AppPatched('mongodb://fake');
    return new Promise<void>(resolve => {
      setTimeout(() => {
        request = supertest(app.expressApp);
        resolve();
      }, 10);
    });
  });

  //GET all
  describe('GET /app/communityNotes/:noteId/comments (List Objects)', () => {
    it('should return status 200', async () => {
      const res = await request.get('/app/communityNotes/note123/comments');
      expect(res.status).to.equal(200);
    });

    it('should return an array of comments with length ≥ 2', async () => {
      const res = await request.get('/app/communityNotes/note123/comments');
      expect(res.body).to.be.an('array').with.length.of.at.least(2);
    });

    it('each comment should have comentId, noteId, and text', async () => {
      const res = await request.get('/app/communityNotes/note123/comments');
      res.body.forEach((c: any) => {
        expect(c).to.include.keys('id', 'noteId', 'text');
        expect(c.noteId).to.equal('note123');
        expect(c.text).to.be.a('string');
      });
    });
  });
  
  //GET one
  describe('GET /app/comments/:commentId (Single Object)', () => {
    it('should return the correct comment object', async () => {
      const res = await request.get('/app/comments/1');
      expect(res.status).to.equal(200);
      expect(res.body).to.include({ id: '1', text: 'Comment' });
    });

    it('returned comment should have only commentId and text', async () => {
      const res = await request.get('/app/comments/1');
      expect(Object.keys(res.body)).to.have.members(['id', 'text']);
    });

    it('should return 404 for non-existing comment', async () => {
      const res = await request.get('/app/comments/999');
      expect(res.status).to.equal(404);
    });
  });

  //POST
  describe('POST /app/communityNotes/:noteId/comments', () => {
    const payload = {commentId: 'new1',noteId: 'note123', userId: 'userX', text: 'Hello'};

    it('should create a comment and return status 201', async () => {
      const res = await request
        .post('/app/communityNotes/note123/comments')
        .send(payload);
      expect(res.status).to.equal(201);
    });
  });
});
