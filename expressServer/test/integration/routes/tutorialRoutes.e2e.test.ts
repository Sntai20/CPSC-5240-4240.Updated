import * as chai from 'chai';
import { request, default as chaiHttp } from 'chai-http';
import { expect } from 'chai';

chai.use(chaiHttp);

const baseUrl = 'http://localhost:8080';

describe('TutorialModel API endpoints (E2E)', () => {

  describe('POST /app/tutorials (E2E)', () => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const uniqueAuthorId = `author-${uniqueId}`;
    const uniqueTutorialId = `tut-${uniqueId}`;
    it('should create a tutorial and return it', async () => {
      const newTutorial = {
        tutorialId: uniqueTutorialId,
        title: 'Test Tutorial',
        text: 'This is the main content of the test tutorial.',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        authorId: uniqueAuthorId,
        authorName: 'Test Author',
        category: 'Testing',
        tags: ['test', 'tutorial'],
        views: 0,
        likes: 0,
        dislikes: 0,
        steps: [],
        published: true,
      };

      const res = await request.execute(baseUrl)
        .post('/app/tutorials')
        .send(newTutorial)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.tutorialId).to.equal(newTutorial.tutorialId);
      expect(res.body.title).to.equal(newTutorial.title);
      expect(res.body.published).to.equal(newTutorial.published);
    });
  });

  describe('GET /app/tutorials (List Objects) (E2E)', () => {
    it('should return status 200 for GET /app/tutorials', done => {
      request.execute(baseUrl)
        .get('/app/tutorials')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.length.of.at.least(1);
          done();
        });
    });
  });

  describe('GET /app/tutorials (Single Object) (E2E)', () => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const uniqueAuthorId = `author-${uniqueId}`;
    const uniqueTutorialId = `tut-${uniqueId}`;
    it('should return status 200 for GET /app/tutorials/:tutorialId', async () => {
      const newTutorial = {
        tutorialId: uniqueTutorialId,
        title: 'Test Tutorial',
        text: 'This is the main content of the test tutorial.',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        authorId: uniqueAuthorId,
        authorName: 'Test Author',
        category: 'Testing',
        tags: ['test', 'tutorial'],
        views: 0,
        likes: 0,
        dislikes: 0,
        steps: [],
        published: true,
      };

      // First, create the tutorial and wait for it to finish
      const postRes = await request.execute(baseUrl)
        .post('/app/tutorials')
        .send(newTutorial)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(postRes).to.have.status(201);

      const getRes = await request.execute(baseUrl)
        .get(`/app/tutorials/${newTutorial.tutorialId}`);
      expect(getRes).to.have.status(200);
      expect(getRes.body).to.be.an('object');
      expect(getRes.body.tutorialId).to.equal(newTutorial.tutorialId);
    });
  });
});