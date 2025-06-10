"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest = require("supertest");
const ModelMocks_1 = require("../mocks/ModelMocks");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const proxyquire = require('proxyquire').noCallThru();
// Patch the App to use mocks
const AppPatched = proxyquire('../../../src/App', {
    './model/TutorialModel': { TutorialModel: ModelMocks_1.TutorialModelMock },
    './model/CommentModel': { CommentModel: ModelMocks_1.CommentModelMock },
    './model/CommunityNoteModel': { CommunityNoteModel: ModelMocks_1.CommunityNoteModelMock },
}).App;
describe('TutorialModel endpoints', () => {
    let request;
    before(() => {
        const app = new AppPatched('mongodb://fake');
        return new Promise(resolve => {
            setTimeout(() => {
                request = supertest(app.expressApp);
                resolve();
            }, 10);
        });
    });
    //GET all
    describe('GET /app/tutorials (List Objects)', () => {
        it('should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/tutorials');
            (0, chai_1.expect)(res.status).to.equal(200);
        }));
        it('should return an array of tutorials with length ≥ 2', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/tutorials');
            (0, chai_1.expect)(res.body).to.be.an('array').with.length.of.at.least(2);
        }));
        it('each tutorial should have tutorialId and title', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/tutorials');
            res.body.forEach((tut) => {
                (0, chai_1.expect)(tut).to.include.keys('tutorialId', 'title');
                (0, chai_1.expect)(tut.tutorialId).to.be.a('string');
                (0, chai_1.expect)(tut.title).to.be.a('string');
            });
        }));
    });
    // GET one
    describe('GET /app/tutorials/:tutorialId (Single Object)', () => {
        it('should return the correct tutorial object', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/tutorials/123');
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.include({ tutorialId: '123', title: 'Test' });
        }));
        it('should include description and steps properties', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/tutorials/123');
            (0, chai_1.expect)(res.body).to.include.keys('description', 'steps');
            (0, chai_1.expect)(res.body.steps).to.be.an('array');
        }));
        it('should return 404 for non-existing tutorial', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/tutorials/999');
            (0, chai_1.expect)(res.status).to.equal(404);
        }));
    });
    //POST
    describe('POST /app/tutorials', () => {
        it('should create a tutorial and return it', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = { title: 'New Tutorial' };
            const res = yield request.post('/app/tutorials').send(payload);
            (0, chai_1.expect)(res.status).to.equal(201);
            (0, chai_1.expect)(res.body).to.include({ title: 'New Tutorial' });
            (0, chai_1.expect)(res.body).to.have.property('tutorialId').that.is.a('string');
        }));
    });
});
//# sourceMappingURL=tutorialRoutes.test.js.map