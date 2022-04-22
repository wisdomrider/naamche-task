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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNames = exports.userLogin = exports.userRegister = void 0;
const User_1 = __importDefault(require("../schemas/User"));
const generateError_1 = require("../utils/generateError");
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.default.create(req.body);
        res.json({
            created: true,
            username: user.username,
        });
    }
    catch (e) {
        return (0, generateError_1.generateError)(res, e, 400);
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username: req.body.username });
        if (!user)
            return (0, generateError_1.generateError)(res, "User not found");
        const isMatch = yield user.validatePassword(req.body.password);
        if (!isMatch)
            return (0, generateError_1.generateError)(res, "Wrong password");
        const token = user.generateToken();
        user.token = token;
        yield user.save();
        res.send({ token, username: user.username, name: user.name });
    }
    catch (e) {
        console.log(e);
        return (0, generateError_1.generateError)(res, "Something went wrong");
    }
});
exports.userLogin = userLogin;
const getUserNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({
            $text: { $search: req.params.search },
        }, ["username"]);
        res.json(users.filter((user) => user.username !== res.locals.user.username));
    }
    catch (e) {
        console.log(e);
        return (0, generateError_1.generateError)(res, "Something went wrong");
    }
});
exports.getUserNames = getUserNames;
