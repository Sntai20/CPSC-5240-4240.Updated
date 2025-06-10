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
exports.UserModel = void 0;
const Mongoose = require("mongoose");
const crypto = require("crypto");
const uuid_1 = require("uuid");
class UserModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            userId: { type: String, default: () => (0, uuid_1.v4)().replace(/-/g, ''), unique: true },
            googleId: { type: String, required: true },
            username: { type: String, required: true, unique: true },
            email: { type: String, required: true },
            hashed_pwd: { type: String },
            points: { type: Number, required: true }
        }, {
            collection: 'users',
            timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
        });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model('User', this.schema);
            }
            catch (e) {
                console.error('Error creating user model:', e);
            }
        });
    }
    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('base64');
    }
    createUser(userData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                userData.hashed_pwd = this.hashPassword(userData.password);
                delete userData.password;
                const newUser = new this.model(userData);
                const result = yield newUser.save();
                response.status(201).json({ username: result.username, email: result.email, createdDate: result.createdDate });
            }
            catch (err) {
                console.error('User creation failed:', err);
                response.status(400).json({ message: 'Error creating user', error: err });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = yield this.model.findOne({ username }).exec();
                if (!user) {
                    res.status(401).json({ message: 'User not found' });
                }
                else if (user.hashed_pwd === this.hashPassword(password)) {
                    // Send back session cookies
                    res.status(200).json({ message: 'Login successful' });
                }
                else {
                    res.status(401).json({ message: 'Authentication failed' });
                }
            }
            catch (err) {
                console.error('User login failed:', err);
                res.status(500).json({ message: 'Login error', error: err });
            }
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ username }).exec();
        });
    }
    retrieveAllUsers(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.model.find().select('username email points createdDate updatedDate').exec();
                response.json(users);
            }
            catch (error) {
                response.status(500).json({ message: 'Error retrieving users', error });
            }
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map