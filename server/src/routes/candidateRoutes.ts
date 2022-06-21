import { Router } from "express";
import { getCandidates, addCandidate } from "../controllers/candidateController";



const router = Router();


router.get("/", getCandidates);
router.post("/", addCandidate);

export default router;
