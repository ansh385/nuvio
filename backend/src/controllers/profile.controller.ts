import type { Request, Response } from "express";
import { updateUserProfile } from "../services/profile.service";

export async function completeOnboarding(req: Request, res: Response) {
    try {
        const user = res.locals.user;
        const authHeader = req.headers.authorization;

        if (!user || !authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const accessToken = authHeader.split(" ")[1];

        const {
            full_name,
            career_goal,
            experience_level,
            daily_study_minutes,
        } = req.body;

        if (
            !full_name ||
            !career_goal ||
            !experience_level ||
            daily_study_minutes === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "All onboarding fields are required",
            });
        }

        const profile = await updateUserProfile(
            user.id,
            accessToken,
            {
                full_name,
                career_goal,
                experience_level,
                daily_study_minutes,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Onboarding completed successfully",
            data: profile,
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Onboarding failed";

        return res.status(400).json({
            success: false,
            message,
        });
    }
}