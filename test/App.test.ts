import { expect } from 'chai';
import * as sinon from 'sinon';
import * as supertest from 'supertest';
const proxyquire = require('proxyquire').noCallThru();

// Mock TutorialModel and CommentModel
class TutorialModelMock {
    createModel = sinon.stub().resolves();
    retrieveAllTutorials = sinon.stub().callsFake((res) => res.json([{ tutorialId: '1', title: 'Test' }]));
    retrieveTutorial = sinon.stub().callsFake((res, id) => res.json({ tutorialId: id, title: 'Test' }));
    createTutorial = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
}
class CommentModelMock {
    createModel = sinon.stub().resolves();
    retrieveAll = sinon.stub().callsFake((res) => res.json([{ id: '1', text: 'Comment' }]));
    retrieveByID = sinon.stub().callsFake((res, id) => res.json({ id, text: 'Comment' }));
    createComment = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
}

// Patch the App to use mocks
const AppPatched = proxyquire('../src/App', {
    './model/TutorialModel': { TutorialModel: TutorialModelMock },
    './model/CommentModel': { CommentModel: CommentModelMock }
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
        it('GET /app/tutorials should return all tutorials', async () => {
            const res = await request.get('/app/tutorials');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('tutorialId');
        });

        it('GET /app/tutorials/:tutorialId should return a tutorial', async () => {
            const res = await request.get('/app/tutorials/123');
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('tutorialId', '123');
        });

        it('POST /app/tutorials should create a tutorial', async () => {
            const res = await request.post('/app/tutorials').send({ title: 'New Tutorial' });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('title', 'New Tutorial');
            expect(res.body).to.have.property('tutorialId');
        });
    });

    describe('CommentModel endpoints', () => {
        it('GET /app/comments should return all comments', async () => {
            const res = await request.get('/app/comments');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('id');
        });

        it('GET /app/comments/:id should return a comment', async () => {
            const res = await request.get('/app/comments/abc');
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id', 'abc');
        });

        it('POST /app/comments should create a comment', async () => {
            const res = await request.post('/app/comments').send({ text: 'Hello' });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('text', 'Hello');
        });
    });

    describe('CORS middleware', () => {
        it('should set CORS headers', async () => {
            const res = await request.get('/app/tutorials');
            expect(res.headers).to.have.property('access-control-allow-origin', '*');
            expect(res.headers).to.have.property('access-control-allow-headers');
        });
    });
});