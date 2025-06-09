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
exports.communityNotesRoutes = communityNotesRoutes;
const express_1 = require("express");
const crypto = require("crypto");
function communityNotesRoutes(CommunityNotes) {
    const router = (0, express_1.Router)();
    router.get('/app/communityNotes', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield CommunityNotes.retrieveAll(res);
    }));
    router.get('/app/communityNotes/tutorial/:tutorialId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield CommunityNotes.retrieveByTutorialID(res, req.params.tutorialId);
    }));
    router.get('/app/communityNotes/:noteId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield CommunityNotes.retrieveByID(res, req.params.noteId);
    }));
    router.post('/app/communityNotes', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.body.noteId || crypto.randomBytes(8).toString('hex');
        const jsonObj = Object.assign(Object.assign({}, req.body), { noteId: id });
        yield CommunityNotes.createCommunityNote(res, jsonObj);
    }));
    return router;
}
//# sourceMappingURL=communityNotesRoutes.js.map