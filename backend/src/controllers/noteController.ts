import { Request, Response } from "express";

import { Types } from "mongoose";
import Note from "../schemas/Note";
import { generateError } from "../utils/generateError";
export const saveNote = async (req: Request, res: Response) => {
  const { content, sharedWith } = req.body;
  const { _id } = req.body;

  try {
    let note;
    if (_id) {
      note = await Note.findOneAndUpdate(
        {
          _id: _id,
          $or: [
            { sharedWith: { $in: [res.locals.user._id] } },
            { user: res.locals.user._id },
          ],
        },
        { content, sharedWith },
        { new: true }
      );
    } else {
      note = await Note.create({
        content,
        user: res.locals.user._id,
        sharedWith,
      });
    }
    res.json(note);
  } catch (err) {
    return generateError(res, err, 400);
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({
      $or: [{ sharedWith: res.locals.user._id }, { user: res.locals.user._id }],
    }).populate("sharedWith", "username");
    res.json(notes);
  } catch (err) {
    return generateError(res, err, 400);
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      $or: [
        { sharedWith: { $in: [res.locals.user._id] } },
        { user: res.locals.user._id },
      ],
    }).populate("sharedWith", "username");
    res.json(note);
  } catch (err) {
    return generateError(res, err, 400);
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return generateError(res, "Invalid id", 400);

  try {
    const note = await Note.findOneAndDelete({
      _id: id,
      user: res.locals.user._id,
    });
    if (!note) return generateError(res, "Note not found", 404);
    res.json({ deleted: true, message: "Note deleted" });
  } catch (err) {
    return generateError(res, err, 400);
  }
};
