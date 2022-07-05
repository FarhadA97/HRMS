import { Router } from "express";
import { login, register, validate } from "../controllers/userController";
import auth from "../middleware/auth";


const router = Router();

router.post("/validate", auth, validate);
router.post("/register", register);
router.post("/login", login);

export default router;
