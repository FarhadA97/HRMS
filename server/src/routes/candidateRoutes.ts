import { Router } from "express";
import { getCandidates, addCandidate, deleteCandidate} from "../controllers/candidateController";



const router = Router();


router.get("/", getCandidates);
router.post("/", addCandidate);
router.delete("/:id", deleteCandidate);

export default router;
