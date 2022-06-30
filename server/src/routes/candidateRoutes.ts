import { Router } from "express";
import { getCandidates, addCandidate, updateCandidate, deleteCandidate} from "../controllers/candidateController";
import { addNote, deleteNote, editNote } from "../controllers/notesController"



const router = Router();


router.get("/", getCandidates);
router.post("/", addCandidate);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);
router.post("/notes/:id", addNote);
router.delete("/notes/:id", deleteNote);
router.put("/notes/:id", editNote)

export default router;
