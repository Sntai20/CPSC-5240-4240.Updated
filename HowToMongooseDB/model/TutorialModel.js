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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialModel = void 0;
var Mongoose = require("mongoose");

/**
 * TutorialModel class for handling MongoDB operations related to tutorials
 */
var TutorialModel = /** @class */ (function () {
    /**
     * Constructor for TutorialModel class
     * @param DB_CONNECTION_STRING MongoDB connection string
     */
    function TutorialModel(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    /**
     * Creates the schema for tutorial documents
     */
    TutorialModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            title: String,
            description: String,
            tutorialId: String,
            createdDate: { type: Date, default: Date.now },
            updatedDate: { type: Date, default: Date.now },
            authorId: String,
            authorName: String,
            category: String,
            tags: [String],
            views: { type: Number, default: 0 },
            likes: { type: Number, default: 0 },
            dislikes: { type: Number, default: 0 },
            steps: [
                {
                    stepNumber: Number,
                    description: String,
                    imageUrls: [String],
                    videoUrls: [String]
                }
            ],
            published: { type: Boolean, default: false }
        }, { collection: 'tutorials' });
    };

    /**
     * Creates the Mongoose model for tutorials
     */
    TutorialModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })];
                    case 1:
                        _a.sent();
                        this.model = Mongoose.model("Tutorial", this.schema);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Retrieves all tutorials
     * @param response Express response object
     */
    TutorialModel.prototype.retrieveAllTutorials = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var query, tutorialArray, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ published: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        tutorialArray = _a.sent();
                        response.json(tutorialArray);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Retrieves tutorials by category
     * @param response Express response object
     * @param category Category to filter by
     */
    TutorialModel.prototype.retrieveTutorialsByCategory = function (response, category) {
        return __awaiter(this, void 0, void 0, function () {
            var query, tutorialArray, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ category: category, published: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        tutorialArray = _a.sent();
                        response.json(tutorialArray);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Retrieves tutorials by tag
     * @param response Express response object
     * @param tag Tag to filter by
     */
    TutorialModel.prototype.retrieveTutorialsByTag = function (response, tag) {
        return __awaiter(this, void 0, void 0, function () {
            var query, tutorialArray, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ tags: tag, published: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        tutorialArray = _a.sent();
                        response.json(tutorialArray);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        console.error(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Retrieves tutorials by author
     * @param response Express response object
     * @param authorId Author ID to filter by
     */
    TutorialModel.prototype.retrieveTutorialsByAuthor = function (response, authorId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, tutorialArray, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ authorId: authorId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        tutorialArray = _a.sent();
                        response.json(tutorialArray);
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        console.error(e_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Retrieves a single tutorial by ID
     * @param response Express response object
     * @param tutorialId Tutorial ID to retrieve
     */
    TutorialModel.prototype.retrieveTutorial = function (response, tutorialId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findOne({ tutorialId: tutorialId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        result = _a.sent();
                        response.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        console.error(e_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Retrieves tutorial count
     * @param response Express response object
     */
    TutorialModel.prototype.retrieveTutorialCount = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var query, numberOfTutorials, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Retrieving tutorial count...");
                        query = this.model.countDocuments({ published: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        numberOfTutorials = _a.sent();
                        console.log("Number of tutorials: " + numberOfTutorials);
                        response.json(numberOfTutorials);
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        console.error(e_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Updates view count for a tutorial
     * @param response Express response object
     * @param tutorialId Tutorial ID to update
     */
    TutorialModel.prototype.incrementViewCount = function (response, tutorialId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate(
                            { tutorialId: tutorialId },
                            { $inc: { views: 1 } },
                            { new: true }
                        ).exec()];
                    case 1:
                        result = _a.sent();
                        response.json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        console.error(e_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Updates like count for a tutorial
     * @param response Express response object
     * @param tutorialId Tutorial ID to update
     * @param isLike True for like, false for dislike
     */
    TutorialModel.prototype.updateLikeCount = function (response, tutorialId, isLike) {
        return __awaiter(this, void 0, void 0, function () {
            var updateQuery, result, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateQuery = isLike 
                            ? { $inc: { likes: 1 } }
                            : { $inc: { dislikes: 1 } };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.model.findOneAndUpdate(
                            { tutorialId: tutorialId },
                            updateQuery,
                            { new: true }
                        ).exec()];
                    case 2:
                        result = _a.sent();
                        response.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_9 = _a.sent();
                        console.error(e_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Searches tutorials by keyword
     * @param response Express response object
     * @param keyword Keyword to search by
     */
    TutorialModel.prototype.searchTutorials = function (response, keyword) {
        return __awaiter(this, void 0, void 0, function () {
            var searchRegex, query, results, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchRegex = new RegExp(keyword, 'i');
                        query = this.model.find({ 
                            published: true,
                            $or: [
                                { title: searchRegex },
                                { description: searchRegex },
                                { tags: searchRegex },
                                { 'steps.description': searchRegex }
                            ]
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        results = _a.sent();
                        response.json(results);
                        return [3 /*break*/, 4];
                    case 3:
                        e_10 = _a.sent();
                        console.error(e_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    return TutorialModel;
}());
exports.TutorialModel = TutorialModel;