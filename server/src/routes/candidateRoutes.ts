import { Router } from "express";
import { getCandidates, addCandidate, updateCandidate, deleteCandidate} from "../controllers/candidateController";



const router = Router();


router.get("/", getCandidates);
router.post("/", addCandidate);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

export default router;
