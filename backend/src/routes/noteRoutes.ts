import { Router } from "express";
import {
  deleteNote,
  getAllNotes,
  getNote,
  saveNote,
} from "../controllers/noteController";

const router = Router();

router.get("/", getAllNotes);
router.post("/save", saveNote);
router.delete("/:id", deleteNote);
router.get("/:id", getNote);
export default router;
