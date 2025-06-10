import * as chai from 'chai';
import { request, default as chaiHttp } from 'chai-http';

const expect = chai.expect;
 
chai.use(chaiHttp);
 
const AZURE_API_URL = 'http://tutorialplatformmac-f0e4a3faemd4b4e5.westus-01.azurewebsites.net'; 
 
describe('Azure API Unprotected Endpoints (E2E)', () => {

  let createdId: string;
 
  // 1. HTTP GET List

  it('should GET a list of tutorials', async () => {
    const res = await request.execute(AZURE_API_URL).get('/app/tutorials');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');

    for (const item of res.body) {
      expect(item).to.have.property('tutorialId');
      expect(item).to.have.property('title');
      expect(item).to.have.property('text');
      expect(item).to.have.property('published');
      expect(item).to.have.property('authorName');
      expect(item).to.have.property('category');
    }
  });
 
  // 2. HTTP POST Single

  it('should POST a new tutorial and return it', async () => {
    const payload = {
      title: 'Azure Test Tutorial',
      text: 'This is a test tutorial for Azure endpoint.',
      authorName: 'Azure Tester',
      authorId: 'authorID005',
      category: 'azure'
    };

    const res = await request.execute(AZURE_API_URL)
      .post('/app/tutorials')
      .send(payload);

    expect(res).to.have.status(201);
    expect(res.body).to.include({ title: payload.title });
    expect(res.body).to.have.property('tutorialId');
    expect(res.body).to.have.property('title');
    expect(res.body).to.have.property('category');
    expect(res.body).to.have.property('text');
    expect(res.body).to.have.property('authorName');
    expect(res.body).to.have.property('authorId');
    createdId = res.body.tutorialId;
  });
 
  // 3. HTTP GET Single
  it('should GET a single tutorial by ID', async () => {

    if (!createdId) return;
    const res = await request.execute(AZURE_API_URL).get(`/app/tutorials/${createdId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('tutorialId', createdId);
    expect(res.body).to.have.property('title');
    expect(res.body).to.have.property('category');
    expect(res.body).to.have.property('text');
    expect(res.body).to.have.property('published');
    expect(res.body).to.have.property('authorName');
  });

});
 