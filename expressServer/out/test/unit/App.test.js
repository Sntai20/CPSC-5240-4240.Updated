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
const ModelMocks_1 = require("./mocks/ModelMocks");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const proxyquire = require('proxyquire').noCallThru();
// Patch the App to use mocks
const AppPatched = proxyquire('../../src/App', {
    './model/TutorialModel': { TutorialModel: ModelMocks_1.TutorialModelMock },
    './model/CommentModel': { CommentModel: ModelMocks_1.CommentModelMock },
    './model/CommunityNoteModel': { CommunityNoteModel: ModelMocks_1.CommunityNoteModelMock },
}).App;
describe('App', () => {
    let app;
    let request;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        app = new AppPatched('mongodb://fake');
        // Wait for routes to be set up
        yield new Promise(resolve => setTimeout(resolve, 10));
        request = supertest(app.expressApp);
    }));
    describe('CORS middleware', () => {
        it('should set CORS headers', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/app/tutorials');
            (0, chai_1.expect)(res.headers).to.have.property('access-control-allow-origin', '*');
            (0, chai_1.expect)(res.headers).to.have.property('access-control-allow-headers');
        }));
    });
});
//# sourceMappingURL=App.test.js.map