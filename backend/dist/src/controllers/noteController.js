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
exports.deleteNote = exports.getNote = exports.getAllNotes = exports.saveNote = void 0;
const mongoose_1 = require("mongoose");
const Note_1 = __importDefault(require("../schemas/Note"));
const generateError_1 = require("../utils/generateError");
const saveNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, sharedWith } = req.body;
    const { _id } = req.body;
    try {
        let note;
        if (_id) {
            note = yield Note_1.default.findOneAndUpdate({
                _id: _id,
                $or: [
                    { sharedWith: { $in: [res.locals.user._id] } },
                    { user: res.locals.user._id },
                ],
            }, { content, sharedWith }, { new: true });
            if (!note)
                return (0, generateError_1.generateError)(res, "Note not found", 404);
        }
        else {
            note = yield Note_1.default.create({
                content,
                user: res.locals.user._id,
                sharedWith,
            });
        }
        res.json(note);
    }
    catch (err) {
        return (0, generateError_1.generateError)(res, err, 400);
    }
});
exports.saveNote = saveNote;
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield Note_1.default.find({
            $or: [{ sharedWith: res.locals.user._id }, { user: res.locals.user._id }],
        }).populate("sharedWith", "username");
        res.json(notes);
    }
    catch (err) {
        return (0, generateError_1.generateError)(res, err, 400);
    }
});
exports.getAllNotes = getAllNotes;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield Note_1.default.findOne({
            _id: req.params.id,
            $or: [
                { sharedWith: { $in: [res.locals.user._id] } },
                { user: res.locals.user._id },
            ],
        }).populate("sharedWith", "username");
        res.json(note);
    }
    catch (err) {
        return (0, generateError_1.generateError)(res, err, 400);
    }
});
exports.getNote = getNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return (0, generateError_1.generateError)(res, "Invalid id", 400);
    try {
        const note = yield Note_1.default.findOneAndDelete({
            _id: id,
            $or: [
                { sharedWith: { $in: [res.locals.user._id] } },
                { user: res.locals.user._id },
            ],
        });
        if (!note)
            return (0, generateError_1.generateError)(res, "Note not found", 404);
        res.json({ deleted: true, message: "Note deleted" });
    }
    catch (err) {
        return (0, generateError_1.generateError)(res, err, 400);
    }
});
exports.deleteNote = deleteNote;
