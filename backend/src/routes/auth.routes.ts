import { Router } from "express";
import {
    getCurrentUser,
    login,
    signUp,
} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);

router.get("/me", requireAuth, getCurrentUser);

export default router;