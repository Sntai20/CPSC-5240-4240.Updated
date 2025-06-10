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
const chai = require("chai");
const chai_http_1 = require("chai-http");
const chai_1 = require("chai");
chai.use(chai_http_1.default);
const baseUrl = 'http://localhost:8080';
function generateUniqueIds() {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    return {
        commentId: uniqueId,
        noteId: `note-${uniqueId}`,
        userId: `user-${uniqueId}`,
    };
}
function createComment(comment) {
    return __awaiter(this, void 0, void 0, function* () {
        return chai_http_1.request.execute(baseUrl)
            .post(`/app/communityNotes/${comment.noteId}/comments`)
            .send(comment)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
    });
}
describe('CommentModel API endpoints (E2E)', () => {
    it('should create a comment and return it', () => __awaiter(void 0, void 0, void 0, function* () {
        const ids = generateUniqueIds();
        const newComment = Object.assign(Object.assign({}, ids), { text: 'This is a test comment.', votesUp: 0, votesDown: 0 });
        const res = yield createComment(newComment);
        (0, chai_1.expect)(res).to.have.status(201);
        (0, chai_1.expect)(res.body).to.be.an('object');
        (0, chai_1.expect)(res.body.commentId).to.equal(newComment.commentId);
        (0, chai_1.expect)(res.body.text).to.equal(newComment.text);
    }));
    it('should return status 200 for GET /app/comments/:commentId', () => __awaiter(void 0, void 0, void 0, function* () {
        const ids = generateUniqueIds();
        const newComment = Object.assign(Object.assign({}, ids), { text: 'This is a test comment.', votesUp: 0, votesDown: 0 });
        yield createComment(newComment);
        const res = yield chai_http_1.request.execute(baseUrl)
            .get(`/app/comments/${newComment.commentId}`);
        (0, chai_1.expect)(res).to.have.status(200);
        (0, chai_1.expect)(res.body).to.be.an('object');
        (0, chai_1.expect)(res.body.commentId).to.equal(newComment.commentId);
    }));
    it('should return status 200 for GET /app/communityNotes/:noteId/comments', () => __awaiter(void 0, void 0, void 0, function* () {
        const ids = generateUniqueIds();
        const newComment = Object.assign(Object.assign({}, ids), { text: 'This is a test comment.', votesUp: 0, votesDown: 0 });
        yield createComment(newComment);
        const res = yield chai_http_1.request.execute(baseUrl)
            .get(`/app/communityNotes/${newComment.noteId}/comments`);
        (0, chai_1.expect)(res).to.have.status(200);
        (0, chai_1.expect)(res.body).to.be.an('array');
        (0, chai_1.expect)(res.body[0].commentId).to.equal(newComment.commentId);
    }));
});
//# sourceMappingURL=commentRoutes.e2e.test.js.map