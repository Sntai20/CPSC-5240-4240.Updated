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
exports.commentRoutes = commentRoutes;
const express_1 = require("express");
function commentRoutes(Comments) {
    const router = (0, express_1.Router)();
    router.get('/app/communityNotes/:noteId/comments', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield Comments.retrieveByNoteID(res, req.params.noteId);
    }));
    router.get('/app/comments/:commentId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield Comments.retrieveByID(res, req.params.commentId);
    }));
    router.post('/app/communityNotes/:noteId/comments', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield Comments.createComment(res, req.body);
    }));
    return router;
}
//# sourceMappingURL=commentRoutes.js.map