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

describe('App', () => {
    let app: any;
    let request: any;

    beforeEach(async () => {
        app = new AppPatched('mongodb://fake');
        // Wait for routes to be set up
        await new Promise(resolve => setTimeout(resolve, 10));
        request = supertest(app.expressApp);
    });

    describe('TutorialModel endpoints', () => {
        it('GET /app/tutorials/:tutorialId should return a tutorial', async () => {
            const res = await request.get('/app/tutorials/123');
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('tutorialId', '123');
        });

        it('GET /app/tutorials should return all tutorials', async () => {
            const res = await request.get('/app/tutorials');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('tutorialId');
        });

        it('GET /app/tutorials/:tutorialId should return 404 for non-existing tutorial', async () => {
            const res = await request.get('/app/tutorials/999');
            expect(res.status).to.equal(404);
        });

        it('POST /app/tutorials should create a tutorial', async () => {
            const res = await request.post('/app/tutorials').send({ title: 'New Tutorial' });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('title', 'New Tutorial');
            expect(res.body).to.have.property('tutorialId');
        });
    });
});