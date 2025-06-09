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
exports.tutorialRoutes = tutorialRoutes;
const express_1 = require("express");
const crypto = require("crypto");
function tutorialRoutes(Tutorials) {
    const router = (0, express_1.Router)();
    router.get('/app/tutorials', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield Tutorials.retrieveAllTutorials(res);
    }));
    router.get('/app/tutorials/:tutorialId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield Tutorials.retrieveTutorial(res, req.params.tutorialId);
    }));
    router.post('/app/tutorials', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.body.tutorialId || crypto.randomBytes(8).toString('hex');
        const jsonObj = Object.assign(Object.assign({}, req.body), { tutorialId: id });
        yield Tutorials.createTutorial(res, jsonObj);
    }));
    return router;
}
//# sourceMappingURL=tutorialRoutes.js.map