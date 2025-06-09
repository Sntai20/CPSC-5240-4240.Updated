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
exports.CommunityNoteModel = void 0;
const Mongoose = require("mongoose");
class CommunityNoteModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            noteId: { type: String, required: true },
            tutorialId: { type: String, required: true },
            userId: { type: String, required: true },
            title: { type: String, required: true, default: '?MissingTitle?' },
            text: { type: String, required: true },
            votesDown: { type: Number, default: 0 },
            createdDate: { type: Date, default: Date.now },
            updatedDate: { type: Date, default: Date.now }
        }, { collection: "communityNotes" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("CommunityNote", this.schema);
            }
            catch (e) {
                console.error("Mongo connection error:", e);
            }
        });
    }
    //GET all community notes
    retrieveAll(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.model.find().sort({ createdDate: -1 }).exec();
                response.json(docs);
            }
            catch (e) {
                console.error(e);
                response.status(500).json({ message: "Error retrieving community notes", error: e });
            }
        });
    }
    //GET notes for a specific tutorial 
    retrieveByTutorialID(response, tutorialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.model.find({ tutorialId }).sort({ createdDate: -1 }).exec();
                response.json(docs);
            }
            catch (e) {
                console.error(e);
                response
                    .status(500)
                    .json({ message: "Error retrieving community notes by tutorial", error: e });
            }
        });
    }
    //GET a single note by its noteId
    retrieveByID(response, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.findOne({ noteId }).exec();
                if (doc) {
                    response.json(doc);
                }
                else {
                    response.status(404).json({ message: "Community note not found" });
                }
            }
            catch (e) {
                console.error(e);
                response.status(500).json({ message: "Error retrieving community note", error: e });
            }
        });
    }
    //POST a new community note
    createCommunityNote(response, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNote = new this.model(data);
                const result = yield newNote.save();
                response.status(201).json(result);
            }
            catch (e) {
                console.error(e);
                response
                    .status(400)
                    .json({ message: "Error creating community note", error: e });
            }
        });
    }
}
exports.CommunityNoteModel = CommunityNoteModel;
//# sourceMappingURL=CommunityNoteModel.js.map