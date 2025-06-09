"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const TutorialModel_1 = require("./model/TutorialModel");
const CommentModel_1 = require("./model/CommentModel");
const CommunityNoteModel_1 = require("./model/CommunityNoteModel");
const tutorialRoutes_1 = require("./routes/tutorialRoutes");
const commentRoutes_1 = require("./routes/commentRoutes");
const communityNotesRoutes_1 = require("./routes/communityNotesRoutes");
class App {
    constructor(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.Tutorials = new TutorialModel_1.TutorialModel(mongoDBConnection);
        this.Comments = new CommentModel_1.CommentModel(mongoDBConnection);
        this.CommunityNotes = new CommunityNoteModel_1.CommunityNoteModel(mongoDBConnection);
        Promise.all([
            this.Tutorials.createModel(),
            this.Comments.createModel(),
            this.CommunityNotes.createModel()
        ]).then(() => {
            this.routes();
        }).catch(err => {
            console.error('Failed to connect to MongoDB', err);
        });
    }
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    }
    routes() {
        this.expressApp.use('/', (0, tutorialRoutes_1.tutorialRoutes)(this.Tutorials));
        this.expressApp.use('/', (0, commentRoutes_1.commentRoutes)(this.Comments));
        this.expressApp.use('/', (0, communityNotesRoutes_1.communityNotesRoutes)(this.CommunityNotes));
        // Serve static files from the dist directory.
        this.expressApp.use('/', express.static(__dirname + '/dist'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map