import { Router } from "express";
import { completeOnboarding } from "../controllers/profile.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.patch("/onboarding", requireAuth, completeOnboarding);

export default router;