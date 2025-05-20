import { expect } from 'chai';
import * as supertest from 'supertest';
import { TutorialModelMock, CommentModelMock, CommunityNoteModelMock } from '../mocks/ModelMocks';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const proxyquire = require('proxyquire').noCallThru();

// Patch the App to use mocks
const AppPatched = proxyquire('../../src/App', {
  './model/TutorialModel':      { TutorialModel: TutorialModelMock },
  './model/CommentModel':       { CommentModel: CommentModelMock },
  './model/CommunityNoteModel': { CommunityNoteModel: CommunityNoteModelMock },
}).App;

describe('TutorialModel endpoints', () => {
  let request: any;

  before(() => {
    const app = new AppPatched('mongodb://fake');
    // give routes a moment to register
    return new Promise<void>(resolve => {
      setTimeout(() => {
        request = supertest(app.expressApp);
        resolve();
      }, 10);
    });
  });

  describe('GET /app/tutorials (List Objects)', () => {
    it('should return status 200', async () => {
      const res = await request.get('/app/tutorials');
      expect(res.status).to.equal(200);
    });

    it('should return an array of tutorials with length ≥ 2', async () => {
      const res = await request.get('/app/tutorials');
      expect(res.body).to.be.an('array').with.length.of.at.least(2);
    });

    it('each tutorial should have tutorialId and title', async () => {
      const res = await request.get('/app/tutorials');
      res.body.forEach((tut: any) => {
        expect(tut).to.include.keys('tutorialId', 'title');
        expect(tut.tutorialId).to.be.a('string');
        expect(tut.title).to.be.a('string');
      });
    });
  });

  describe('GET /app/tutorials/:tutorialId (Single Object)', () => {
    it('should return the correct tutorial object', async () => {
      const res = await request.get('/app/tutorials/123');
      expect(res.status).to.equal(200);
      expect(res.body).to.include({ tutorialId: '123', title: 'Test' });
    });

    it('should include description and steps properties', async () => {
      const res = await request.get('/app/tutorials/123');
      expect(res.body).to.include.keys('description', 'steps');
      expect(res.body.steps).to.be.an('array');
    });

    it('should return 404 for non-existing tutorial', async () => {
      const res = await request.get('/app/tutorials/999');
      expect(res.status).to.equal(404);
    });
  });

  describe('POST /app/tutorials', () => {
    it('should create a tutorial and return it', async () => {
      const payload = { title: 'New Tutorial' };
      const res = await request.post('/app/tutorials').send(payload);
      expect(res.status).to.equal(201);
      expect(res.body).to.include({ title: 'New Tutorial' });
      expect(res.body).to.have.property('tutorialId').that.is.a('string');
    });
  });
});
