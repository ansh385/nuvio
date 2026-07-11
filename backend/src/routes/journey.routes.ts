import { Router } from "express";
import {
    createJourney,
    getNextStep,
} from "../controllers/journey.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, createJourney);

router.get("/next-step", requireAuth, getNextStep);

export default router;