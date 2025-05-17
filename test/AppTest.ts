import { expect } from 'chai';
import * as sinon from 'sinon';
import * as express from 'express';
import { App } from '../src/App';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const proxyquire = require('proxyquire').noCallThru();

// Mock TutorialModel and CommentModel
class TutorialModelMock {
    createModel = sinon.stub().resolves();
    retrieveAllTutorials = sinon.stub();
    retrieveTutorial = sinon.stub();
    createTutorial = sinon.stub();
    constructor(public conn: string) {}
}
class CommentModelMock {
    createModel = sinon.stub().resolves();
    retrieveAll = sinon.stub();
    retrieveByID = sinon.stub();
    createComment = sinon.stub();
    constructor(public conn: string) {}
}

// Patch the imports in App to use mocks

describe('App', () => {
    let AppPatched: typeof App;
    let sandbox: sinon.SinonSandbox;

    before(() => {
        AppPatched = proxyquire('../src/App', {
            '../src/model/TutorialModel': { TutorialModel: TutorialModelMock },
            '../src/model/CommentModel': { CommentModel: CommentModelMock }
        }).App;
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should initialize express app and models', async () => {
        const app = new AppPatched('mongodb://test');
        expect(app.expressApp).to.be.an('function');
        expect(app.Tutorials).to.be.instanceOf(TutorialModelMock);
        expect(app.Comments).to.be.instanceOf(CommentModelMock);
    });

    it('should set up middleware', () => {
        const useSpy = sandbox.spy((express as any).application, 'use');
        const app = new AppPatched('mongodb://test');
        expect(useSpy.callCount).to.be.greaterThan(0);
    });

    it('should register routes after models are created', async () => {
        const useSpy = sandbox.spy((express as any).application, 'use');
        new AppPatched('mongodb://test');
        await new Promise(res => setTimeout(res, 10));
        // Should register router and static middleware
        expect(useSpy.calledWith('/', sinon.match.any)).to.be.true;
    });
});