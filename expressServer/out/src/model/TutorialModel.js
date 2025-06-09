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
exports.TutorialModel = void 0;
const Mongoose = require("mongoose");
class TutorialModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.stepsSchema = new Mongoose.Schema({
            stepNumber: { type: Number, required: true },
            title: { type: String, required: true },
            text: { type: String, required: true, default: 'Placeholder Text' },
            imageUrls: { type: [String], default: [] },
            videoUrls: { type: [String], default: [] }
        });
        this.schema = new Mongoose.Schema({
            title: { type: String, required: true },
            text: { type: String, required: true },
            tutorialId: { type: String, required: true, unique: true },
            createdDate: { type: Date, default: Date.now },
            updatedDate: { type: Date, default: Date.now },
            authorId: { type: String, required: true },
            authorName: { type: String, required: true },
            category: { type: String, required: true },
            tags: { type: [String], default: [] },
            views: { type: Number, default: 0 },
            likes: { type: Number, default: 0 },
            dislikes: { type: Number, default: 0 },
            steps: [this.stepsSchema],
            published: { type: Boolean, default: false }
        }, {
            collection: 'tutorials',
            timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
        });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("Tutorial", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveAllTutorials(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({ published: true });
            try {
                const itemArray = yield query.exec();
                response.json(itemArray);
            }
            catch (e) {
                console.error(e);
                response.status(500).json({ message: 'Error retrieving tutorials', error: e });
            }
        });
    }
    retrieveTutorial(response, tutorialId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOne({ tutorialId: tutorialId });
            try {
                const tutorial = yield query.exec();
                if (tutorial) {
                    tutorial.views += 1;
                    yield tutorial.save();
                    response.json(tutorial);
                }
                else {
                    response.status(404).json({ message: 'Tutorial not found' });
                }
            }
            catch (e) {
                console.error(e);
                response.status(500).json({ message: 'Error retrieving tutorial', error: e });
            }
        });
    }
    createTutorial(response, tutorialData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTutorial = new this.model(tutorialData);
                const savedTutorial = yield newTutorial.save();
                response.status(201).json(savedTutorial);
            }
            catch (e) {
                console.error(e);
                response.status(400).json({ message: 'Error creating tutorial', error: e });
            }
        });
    }
}
exports.TutorialModel = TutorialModel;
//# sourceMappingURL=TutorialModel.js.map