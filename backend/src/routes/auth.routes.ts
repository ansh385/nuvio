import { Router } from "express";
import {
    forgotPasswordController,
    getCurrentUser,
    login,
    signUp,
} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signUp);
router.post(
    "/forgot-password",
    forgotPasswordController
);
router.post("/login", login);

router.get("/me", requireAuth, getCurrentUser);

export default router;