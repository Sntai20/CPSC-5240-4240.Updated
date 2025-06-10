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
function generateTutorial(overrides = {}) {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    return Object.assign({ tutorialId: `tut-${uniqueId}`, title: 'Test Tutorial', text: 'This is the main content of the test tutorial.', createdDate: new Date().toISOString(), updatedDate: new Date().toISOString(), authorId: `author-${uniqueId}`, authorName: 'Test Author', category: 'Testing', tags: ['test', 'tutorial'], views: 0, likes: 0, dislikes: 0, steps: [], published: true }, overrides);
}
describe('TutorialModel API endpoints (E2E)', () => {
    describe('POST /app/tutorials (E2E)', () => {
        it('should create a tutorial and return it', () => __awaiter(void 0, void 0, void 0, function* () {
            const newTutorial = generateTutorial();
            const res = yield chai_http_1.request.execute(baseUrl)
                .post('/app/tutorials')
                .send(newTutorial)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            (0, chai_1.expect)(res).to.have.status(201);
            (0, chai_1.expect)(res.body).to.be.an('object');
            (0, chai_1.expect)(res.body.tutorialId).to.equal(newTutorial.tutorialId);
            (0, chai_1.expect)(res.body.title).to.equal(newTutorial.title);
            (0, chai_1.expect)(res.body.published).to.equal(newTutorial.published);
        }));
    });
    describe('GET /app/tutorials (List Objects) (E2E)', () => {
        it('should return status 200 for GET /app/tutorials', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield chai_http_1.request.execute(baseUrl).get('/app/tutorials');
            (0, chai_1.expect)(res).to.have.status(200);
            (0, chai_1.expect)(res.body).to.be.an('array').with.length.of.at.least(1);
        }));
    });
    describe('GET /app/tutorials/:tutorialId (Single Object) (E2E)', () => {
        it('should return status 200 for GET /app/tutorials/:tutorialId', () => __awaiter(void 0, void 0, void 0, function* () {
            const newTutorial = generateTutorial();
            const postRes = yield chai_http_1.request.execute(baseUrl)
                .post('/app/tutorials')
                .send(newTutorial)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            (0, chai_1.expect)(postRes).to.have.status(201);
            const getRes = yield chai_http_1.request.execute(baseUrl)
                .get(`/app/tutorials/${newTutorial.tutorialId}`);
            (0, chai_1.expect)(getRes).to.have.status(200);
            (0, chai_1.expect)(getRes.body).to.be.an('object');
            (0, chai_1.expect)(getRes.body.tutorialId).to.equal(newTutorial.tutorialId);
        }));
    });
});
//# sourceMappingURL=tutorialRoutes.e2e.test.js.map