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

    describe('CommentModel endpoints', () => {
        it('GET /app/comments/:id should return a comment', async () => {
            const res = await request.get('/app/comments/abc');
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id', 'abc');
        });

        it('GET /app/comments should return all comments', async () => {
            const res = await request.get('/app/comments');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('id');
        });

        it('GET /app/comments/:id should return 404 for non-existing comment', async () => {
            const res = await request.get('/app/comments/999');
            expect(res.status).to.equal(404);
        });

        it('POST /app/comments should create a comment', async () => {
            const res = await request.post('/app/comments').send({ text: 'Hello' });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('text', 'Hello');
        });
    });
});