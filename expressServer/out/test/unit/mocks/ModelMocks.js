"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityNoteModelMock = exports.CommentModelMock = exports.TutorialModelMock = void 0;
const sinon = require("sinon");
class TutorialModelMock {
    constructor() {
        this.createModel = sinon.stub().resolves();
        this.retrieveAllTutorials = sinon.stub().callsFake((res) => res.json([
            {
                tutorialId: 'tut001',
                title: 'Tutorial One',
                description: 'First tutorial description',
                steps: []
            },
            {
                tutorialId: 'tut002',
                title: 'Tutorial Two',
                description: 'Second tutorial description',
                steps: []
            },
            {
                tutorialId: 'tut003',
                title: 'Tutorial Three',
                description: 'Third tutorial description',
                steps: []
            }
        ]));
        this.retrieveTutorial = sinon.stub().callsFake((res, id) => {
            if (id === '999') {
                return res.status(404).end();
            }
            return res.json({
                tutorialId: id, title: 'Test', description: 'Test description', steps: [
                    { stepNumber: 1, description: 'Step one', imageUrls: [], videoUrls: [] }
                ]
            });
        });
        this.createTutorial = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
    }
}
exports.TutorialModelMock = TutorialModelMock;
class CommentModelMock {
    constructor() {
        this.createModel = sinon.stub().resolves();
        this.retrieveAll = sinon.stub().callsFake((res) => res.json([
            { id: '1', text: 'Comment 1' },
            { id: '2', text: 'Comment 2' },
            { id: '3', text: 'Comment 3' }
        ]));
        this.retrieveByID = sinon.stub().callsFake((res, id) => {
            if (id === '999') {
                return res.status(404).end();
            }
            return res.json({ id, text: 'Comment' });
        });
        this.createComment = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
        this.retrieveByNoteID = sinon.stub().callsFake((res, noteId) => res.json([
            { id: '1', noteId, text: 'Comment 1' },
            { id: '2', noteId, text: 'Comment 2' },
            { id: '3', noteId, text: 'Comment 3' }
        ]));
    }
}
exports.CommentModelMock = CommentModelMock;
class CommunityNoteModelMock {
    constructor() {
        this.createModel = sinon.stub().resolves();
        this.retrieveAll = sinon.stub().callsFake((res) => res.json([{ noteId: '1', title: 'Note' }]));
        this.retrieveByID = sinon.stub().callsFake((res, id) => {
            if (id === '999') {
                return res.status(404).end();
            }
            return res.json({ noteId: id, title: 'Note' });
        });
        this.retrieveByTutorialID = sinon.stub().callsFake((res, id) => {
            if (id === '999') {
                return res.status(404).end();
            }
            return res.json([{ noteId: id, title: 'Note' }]);
        });
        this.createCommunityNote = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
    }
}
exports.CommunityNoteModelMock = CommunityNoteModelMock;
//# sourceMappingURL=ModelMocks.js.map