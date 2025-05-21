import { expect } from 'chai';
import * as supertest from 'supertest';
import { TutorialModelMock, CommentModelMock, CommunityNoteModelMock } from './mocks/ModelMocks';
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

    describe('CORS middleware', () => {
        it('should set CORS headers', async () => {
            const res = await request.get('/app/tutorials');
            expect(res.headers).to.have.property('access-control-allow-origin', '*');
            expect(res.headers).to.have.property('access-control-allow-headers');
        });
    });
});