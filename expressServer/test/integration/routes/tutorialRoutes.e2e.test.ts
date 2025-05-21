import * as chai from 'chai';
import { request, default as chaiHttp } from 'chai-http';
import { expect } from 'chai';

chai.use(chaiHttp);

describe('TutorialModel API endpoints (E2E)', () => {
  var baseUrl = 'http://localhost:8080';
  describe('POST /app/tutorials (E2E)', () => {
    it('should create a tutorial and return it', async () => {
      const newTutorial = {
        tutorialId: '12345',
        title: 'Test Tutorial',
        text: 'This is the main content of the test tutorial.',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        authorId: 'author-001',
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
    it('should return status 200 for GET /app/tutorials/:tutorialId', done => {
      request.execute(baseUrl)
        .get('/app/tutorials/12345')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});