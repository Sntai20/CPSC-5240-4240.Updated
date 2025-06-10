import * as chai from 'chai';
import { request, default as chaiHttp } from 'chai-http';
import { expect } from 'chai';

chai.use(chaiHttp);

// const baseUrl = 'http://localhost:8080';
const baseUrl = 'http://tutorialplatformmac-f0e4a3faemd4b4e5.westus-01.azurewebsites.net';

function generateTutorial(overrides = {}) {
  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return {
    tutorialId: `tut-${uniqueId}`,
    title: 'Test Tutorial',
    text: 'This is the main content of the test tutorial.',
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    authorId: `author-${uniqueId}`,
    authorName: 'Test Author',
    category: 'Testing',
    tags: ['test', 'tutorial'],
    views: 0,
    likes: 0,
    dislikes: 0,
    steps: [],
    published: true,
    ...overrides,
  };
}

describe('TutorialModel API endpoints (E2E)', () => {
  describe('POST /app/tutorials (E2E)', () => {
    it('should create a tutorial and return it', async () => {
      const newTutorial = generateTutorial();
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
    it('should return status 200 for GET /app/tutorials', async () => {
      const res = await request.execute(baseUrl).get('/app/tutorials');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').with.length.of.at.least(1);
    });
  });

  describe('GET /app/tutorials/:tutorialId (Single Object) (E2E)', () => {
    it('should return status 200 for GET /app/tutorials/:tutorialId', async () => {
      const newTutorial = generateTutorial();
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