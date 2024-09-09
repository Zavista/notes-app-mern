import express from "express";
import { createNote, getNotes, getNote } from "../controllers/notes";

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNote);
router.get("/:noteId", getNote);

export default router;
