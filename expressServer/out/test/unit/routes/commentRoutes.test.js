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
describe('CommentModel endpoints', () => {
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
    describe('GET /app/communityNotes/:noteId/comments (List Objects)', () => {
        it('should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/communityNotes/note123/comments');
            (0, chai_1.expect)(res.status).to.equal(200);
        }));
        it('should return an array of comments with length ≥ 2', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/communityNotes/note123/comments');
            (0, chai_1.expect)(res.body).to.be.an('array').with.length.of.at.least(2);
        }));
        it('each comment should have commentId, noteId, and text', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/communityNotes/note123/comments');
            res.body.forEach((c) => {
                (0, chai_1.expect)(c).to.include.keys('id', 'noteId', 'text');
                (0, chai_1.expect)(c.noteId).to.equal('note123');
                (0, chai_1.expect)(c.text).to.be.a('string');
            });
        }));
    });
    //GET one
    describe('GET /app/comments/:commentId (Single Object)', () => {
        it('should return the correct comment object', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/comments/1');
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.include({ id: '1', text: 'Comment' });
        }));
        it('returned comment should have only commentId and text', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/comments/1');
            (0, chai_1.expect)(Object.keys(res.body)).to.have.members(['id', 'text']);
        }));
        it('should return 404 for non-existing comment', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/comments/999');
            (0, chai_1.expect)(res.status).to.equal(404);
        }));
    });
    //POST
    describe('POST /app/communityNotes/:noteId/comments', () => {
        const payload = { commentId: 'new1', noteId: 'note123', userId: 'userX', text: 'Hello' };
        it('should create a comment and return status 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/app/communityNotes/note123/comments')
                .send(payload);
            (0, chai_1.expect)(res.status).to.equal(201);
        }));
    });
});
//# sourceMappingURL=commentRoutes.test.js.map