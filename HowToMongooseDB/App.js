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
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var TutorialModel_1 = require("./model/TutorialModel");
var CommentModel_1 = require("./model/CommentModel");
var crypto = require("crypto");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Tutorials = new TutorialModel_1.TutorialModel(mongoDBConnection);
        this.Comments = new CommentModel_1.CommentModel(mongoDBConnection);
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        
        // Tutorial routes
        router.get('/app/tutorial/:tutorialId/comments/count', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.tutorialId;
                        console.log('Query comments count for tutorial with id: ' + id);
                        return [4 /*yield*/, this.Comments.retrieveCommentCount(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.get('/app/tutorial/:tutorialId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.tutorialId;
                        console.log('Query single tutorial with id: ' + id);
                        return [4 /*yield*/, this.Tutorials.retrieveTutorial(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.post('/app/tutorial/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, jsonObj, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = crypto.randomBytes(16).toString("hex");
                        console.log(req.body);
                        jsonObj = req.body;
                        jsonObj.tutorialId = id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Tutorials.model.create([jsonObj])];
                    case 2:
                        _a.sent();
                        res.send('{"id":"' + id + '"}');
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        console.log('Tutorial creation failed');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        
        router.get('/app/tutorial/:tutorialId/comments', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.tutorialId;
                        console.log('Query comments for tutorial with id: ' + id);
                        return [4 /*yield*/, this.Comments.retrieveComments(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.get('/app/tutorial/:tutorialId/amendments', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.tutorialId;
                        console.log('Query amendments for tutorial with id: ' + id);
                        return [4 /*yield*/, this.Comments.retrieveAmendments(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.post('/app/tutorial/:tutorialId/view', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.tutorialId;
                        console.log('Increment view count for tutorial with id: ' + id);
                        return [4 /*yield*/, this.Tutorials.incrementViewCount(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.post('/app/tutorial/:tutorialId/like', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.tutorialId;
                        console.log('Like tutorial with id: ' + id);
                        return [4 /*yield*/, this.Tutorials.updateLikeCount(res, id, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.post('/app/tutorial/:tutorialId/dislike', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.tutorialId;
                        console.log('Dislike tutorial with id: ' + id);
                        return [4 /*yield*/, this.Tutorials.updateLikeCount(res, id, false)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        // Comment routes
        router.post('/app/comment/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, jsonObj;
            return __generator(this, function (_a) {
                id = crypto.randomBytes(16).toString("hex");
                console.log(req.body);
                jsonObj = req.body;
                jsonObj.commentId = id;
                this.Comments.createComment(res, jsonObj);
                return [2 /*return*/];
            });
        }); });
        
        router.post('/app/comment/:commentId/like', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = req.params.commentId;
                console.log('Like comment with id: ' + id);
                this.Comments.likeComment(res, id);
                return [2 /*return*/];
            });
        }); });
        
        router.post('/app/comment/:commentId/reply', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var parentId, id, jsonObj;
            return __generator(this, function (_a) {
                parentId = req.params.commentId;
                id = crypto.randomBytes(16).toString("hex");
                console.log(req.body);
                jsonObj = req.body;
                jsonObj.commentId = id;
                jsonObj.parentCommentId = parentId;
                this.Comments.createReply(res, jsonObj);
                return [2 /*return*/];
            });
        }); });
        
        router.get('/app/comment/:commentId/replies', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.commentId;
                        console.log('Get replies for comment with id: ' + id);
                        return [4 /*yield*/, this.Comments.retrieveReplies(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.put('/app/comment/:commentId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, updatedContent;
            return __generator(this, function (_a) {
                id = req.params.commentId;
                updatedContent = req.body.content;
                console.log('Update comment with id: ' + id);
                this.Comments.updateComment(res, id, updatedContent);
                return [2 /*return*/];
            });
        }); });
        
        router.delete('/app/comment/:commentId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = req.params.commentId;
                console.log('Delete comment with id: ' + id);
                this.Comments.deleteComment(res, id);
                return [2 /*return*/];
            });
        }); });
        
        // Amendment routes
        router.post('/app/tutorial/:tutorialId/amendment', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tutorialId, id, jsonObj;
            return __generator(this, function (_a) {
                tutorialId = req.params.tutorialId;
                id = crypto.randomBytes(16).toString("hex");
                console.log(req.body);
                jsonObj = req.body;
                jsonObj.commentId = id;
                jsonObj.tutorialId = tutorialId;
                this.Comments.createAmendment(res, jsonObj);
                return [2 /*return*/];
            });
        }); });
        
        // Tutorial listing and search routes
        router.get('/app/tutorials', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Query all tutorials');
                        return [4 /*yield*/, this.Tutorials.retrieveAllTutorials(res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.get('/app/tutorials/count', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Query the number of tutorials in db');
                        return [4 /*yield*/, this.Tutorials.retrieveTutorialCount(res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.get('/app/tutorials/category/:category', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category = req.params.category;
                        console.log('Query tutorials by category: ' + category);
                        return [4 /*yield*/, this.Tutorials.retrieveTutorialsByCategory(res, category)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.get('/app/tutorials/tag/:tag', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = req.params.tag;
                        console.log('Query tutorials by tag: ' + tag);
                        return [4 /*yield*/, this.Tutorials.retrieveTutorialsByTag(res, tag)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.get('/app/tutorials/author/:authorId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var authorId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorId = req.params.authorId;
                        console.log('Query tutorials by author: ' + authorId);
                        return [4 /*yield*/, this.Tutorials.retrieveTutorialsByAuthor(res, authorId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.get('/app/tutorials/search/:keyword', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var keyword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyword = req.params.keyword;
                        console.log('Search tutorials with keyword: ' + keyword);
                        return [4 /*yield*/, this.Tutorials.searchTutorials(res, keyword)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        router.get('/app/user/:userId/comments', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        console.log('Query comments by user: ' + userId);
                        return [4 /*yield*/, this.Comments.retrieveUserComments(res, userId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;