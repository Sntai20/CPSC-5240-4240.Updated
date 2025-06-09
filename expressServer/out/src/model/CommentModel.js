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
exports.CommentModel = void 0;
const Mongoose = require("mongoose");
class CommentModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            commentId: { type: String, required: true },
            noteId: { type: String, required: true },
            userId: { type: String, required: true, default: 'Anonymous User' },
            text: { type: String, required: true },
            votesUp: { type: Number, default: 0 },
            votesDown: { type: Number, default: 0 },
            createdDate: { type: Date, default: Date.now }
        }, { collection: "comments" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("Comment", this.schema);
            }
            catch (e) {
                console.error("Mongo connection error:", e);
            }
        });
    }
    //GET all comments
    retrieveAll(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.model.find().sort({ createdDate: -1 }).exec();
                response.json(docs);
            }
            catch (e) {
                console.error(e);
                response.status(500).json({ message: "Error retrieving comments" });
            }
        });
    }
    //GET all comments for specific community note
    retrieveByNoteID(response, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.model
                    .find({ noteId })
                    .sort({ createdDate: -1 })
                    .exec();
                response.json(docs);
            }
            catch (e) {
                console.error(e);
                response
                    .status(500)
                    .json({ message: 'Error retrieving comments for note', error: e });
            }
        });
    }
    //GET specific comment by ID
    retrieveByID(response, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.findOne({ commentId }).exec();
                if (doc) {
                    response.json(doc);
                }
                else {
                    response.status(404).json({ message: "Comment not found" });
                }
            }
            catch (e) {
                console.error(e);
                response.status(500).json({ message: "Error retrieving comment" });
            }
        });
    }
    //POST new comment
    createComment(response, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newComment = new this.model(data);
                const result = yield newComment.save();
                response.status(201).json(result);
            }
            catch (e) {
                console.error(e);
                response.status(400).json({ message: "Error creating comment", error: e });
            }
        });
    }
}
exports.CommentModel = CommentModel;
//# sourceMappingURL=CommentModel.js.map