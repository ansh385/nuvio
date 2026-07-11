import type {
    NextFunction,
    Request,
    Response,
} from "express";

import {
    createUserJourney,
    generateNextStep,
} from "../services/journey.service";

import { getUserProfile } from "../services/profile.service";
import { generateNextStep } from "../services/journey.service";

export async function getNextStep(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = res.locals.user;

        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const accessToken = authorizationHeader.replace(
            "Bearer ",
            ""
        );

        const profile = await getUserProfile(
            user.id,
            accessToken
        );

        if (!profile.onboarding_completed) {
            return res.status(400).json({
                success: false,
                message:
                    "Complete onboarding before starting your journey",
            });
        }

        const nextStep = generateNextStep({
            career_goal: profile.career_goal,
            experience_level: profile.experience_level,
            daily_study_minutes: profile.daily_study_minutes,
        });

        return res.status(200).json({
            success: true,
            message: "Next step generated successfully",
            data: {
                next_step: nextStep,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function createJourney(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = res.locals.user;

        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const accessToken = authorizationHeader.replace(
            "Bearer ",
            ""
        );

        const profile = await getUserProfile(
            user.id,
            accessToken
        );

        if (!profile.onboarding_completed) {
            return res.status(400).json({
                success: false,
                message:
                    "Complete onboarding before creating your journey",
            });
        }

        const journey = await createUserJourney(
            user.id,
            accessToken,
            {
                career_goal: profile.career_goal,
                experience_level: profile.experience_level,
                daily_study_minutes: profile.daily_study_minutes,
            }
        );

        return res.status(201).json({
            success: true,
            message: "Journey created successfully",
            data: {
                journey,
            },
        });
    } catch (error) {
        next(error);
    }
}