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
exports.CommentModel = void 0;
var Mongoose = require("mongoose");

/**
 * CommentModel class for handling MongoDB operations related to comments
 */
var CommentModel = /** @class */ (function () {
    /**
     * Constructor for CommentModel class
     * @param DB_CONNECTION_STRING MongoDB connection string
     */
    function CommentModel(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    /**
     * Creates the schema for comment documents
     */
    CommentModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            commentId: String,
            tutorialId: String,
            userId: String,
            userName: String,
            content: String,
            createdDate: { type: Date, default: Date.now },
            isAmendment: { type: Boolean, default: false },
            amendmentDetails: {
                stepNumber: Number,
                proposedChange: String
            },
            likes: { type: Number, default: 0 },
            parentCommentId: { type: String, default: null } // For threaded comments/replies
        }, { collection: 'comments' });
    };

    /**
     * Creates the Mongoose model for comments
     */
    CommentModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })];
                    case 1:
                        _a.sent();
                        this.model = Mongoose.model("Comment", this.schema);
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
     * Retrieves all comments for a tutorial
     * @param response Express response object
     * @param tutorialId Tutorial ID to retrieve comments for
     */
    CommentModel.prototype.retrieveComments = function (response, tutorialId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, comments, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ tutorialId: tutorialId }).sort({ createdDate: -1 });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        comments = _a.sent();
                        response.json(comments);
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
     * Retrieves all amendment comments for a tutorial
     * @param response Express response object
     * @param tutorialId Tutorial ID to retrieve amendment comments for
     */
    CommentModel.prototype.retrieveAmendments = function (response, tutorialId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, amendments, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ 
                            tutorialId: tutorialId,
                            isAmendment: true
                        }).sort({ createdDate: -1 });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        amendments = _a.sent();
                        response.json(amendments);
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
     * Retrieves comment count for a tutorial
     * @param response Express response object
     * @param tutorialId Tutorial ID to count comments for
     */
    CommentModel.prototype.retrieveCommentCount = function (response, tutorialId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, commentCount, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.countDocuments({ tutorialId: tutorialId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        commentCount = _a.sent();
                        console.log("Number of comments for tutorial " + tutorialId + ": " + commentCount);
                        response.json({ count: commentCount });
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
     * Adds a like to a comment
     * @param response Express response object
     * @param commentId Comment ID to like
     */
    CommentModel.prototype.likeComment = function (response, commentId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate(
                            { commentId: commentId },
                            { $inc: { likes: 1 } },
                            { new: true }
                        ).exec()];
                    case 1:
                        result = _a.sent();
                        response.json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.error(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Retrieves replies to a specific comment
     * @param response Express response object
     * @param parentCommentId Parent comment ID
     */
    CommentModel.prototype.retrieveReplies = function (response, parentCommentId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, replies, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ parentCommentId: parentCommentId }).sort({ createdDate: 1 });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        replies = _a.sent();
                        response.json(replies);
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
     * Retrieves comments by a specific user
     * @param response Express response object
     * @param userId User ID
     */
    CommentModel.prototype.retrieveUserComments = function (response, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, comments, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ userId: userId }).sort({ createdDate: -1 });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        comments = _a.sent();
                        response.json(comments);
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        console.error(e_7);
                        response.status(500).send("Error retrieving user comments");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Creates a new comment
     * @param response Express response object
     * @param comment Comment object to create
     */
    CommentModel.prototype.createComment = function (response, comment) {
        return __awaiter(this, void 0, void 0, function () {
            var newComment, result, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newComment = new this.model(comment);
                        return [4 /*yield*/, newComment.save()];
                    case 1:
                        result = _a.sent();
                        response.json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        console.error(e_8);
                        response.status(500).send("Error creating comment");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Updates an existing comment
     * @param response Express response object
     * @param commentId Comment ID to update
     * @param updatedContent Updated comment content
     */
    CommentModel.prototype.updateComment = function (response, commentId, updatedContent) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate(
                            { commentId: commentId },
                            { $set: { content: updatedContent } },
                            { new: true }
                        ).exec()];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            response.json(result);
                        } else {
                            response.status(404).send("Comment not found");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _a.sent();
                        console.error(e_9);
                        response.status(500).send("Error updating comment");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Deletes a comment
     * @param response Express response object
     * @param commentId Comment ID to delete
     */
    CommentModel.prototype.deleteComment = function (response, commentId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.deleteOne({ commentId: commentId }).exec()];
                    case 1:
                        result = _a.sent();
                        if (result.deletedCount > 0) {
                            response.json({ success: true, message: "Comment deleted successfully" });
                        } else {
                            response.status(404).send("Comment not found");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_10 = _a.sent();
                        console.error(e_10);
                        response.status(500).send("Error deleting comment");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Creates a reply to an existing comment
     * @param response Express response object
     * @param reply Reply comment object
     */
    CommentModel.prototype.createReply = function (response, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var newReply, result, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newReply = new this.model(reply);
                        return [4 /*yield*/, newReply.save()];
                    case 1:
                        result = _a.sent();
                        response.json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_11 = _a.sent();
                        console.error(e_11);
                        response.status(500).send("Error creating reply");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };

    /**
     * Adds an amendment comment for a tutorial step
     * @param response Express response object
     * @param amendment Amendment comment object
     */
    CommentModel.prototype.createAmendment = function (response, amendment) {
        return __awaiter(this, void 0, void 0, function () {
            var newAmendment, result, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        amendment.isAmendment = true;
                        newAmendment = new this.model(amendment);
                        return [4 /*yield*/, newAmendment.save()];
                    case 1:
                        result = _a.sent();
                        response.json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_12 = _a.sent();
                        console.error(e_12);
                        response.status(500).send("Error creating amendment");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };

    return CommentModel;
}());
exports.CommentModel = CommentModel;