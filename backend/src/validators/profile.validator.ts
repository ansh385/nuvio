import { z } from "zod";

export const onboardingSchema = z.object({
    full_name: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must not exceed 100 characters"),

    career_goal: z
        .string()
        .trim()
        .min(2, "Career goal is required")
        .max(100, "Career goal must not exceed 100 characters"),

    experience_level: z.enum([
        "Beginner",
        "Intermediate",
        "Advanced",
    ]),

    daily_study_minutes: z
        .number()
        .int("Study time must be a whole number")
        .min(15, "Study time must be at least 15 minutes")
        .max(720, "Study time must not exceed 720 minutes"),
});