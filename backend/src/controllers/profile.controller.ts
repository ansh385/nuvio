import type { NextFunction, Request, Response } from "express";
import { updateUserProfile } from "../services/profile.service";
import { onboardingSchema } from "../validators/profile.validator";

export async function completeOnboarding(
    req: Request,
    res: Response,
    next: NextFunction
) {
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

        const profileData = onboardingSchema.parse(req.body);

        const profile = await updateUserProfile(
            user.id,
            accessToken,
            profileData
        );

        return res.status(200).json({
            success: true,
            message: "Onboarding completed successfully",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
}