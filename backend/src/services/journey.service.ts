import { createAuthenticatedSupabaseClient } from "../config/authenticated-supabase";

interface UserProfile {
    career_goal: string;
    experience_level: string;
    daily_study_minutes: number;
}

interface NextStep {
    title: string;
    description: string;
    estimated_minutes: number;
    action_label: string;
}

interface JourneyProfile {
    career_goal: string;
    experience_level: string;
    daily_study_minutes: number;
}

export function generateNextStep(
    profile: UserProfile
): NextStep {
    const {
        career_goal,
        experience_level,
        daily_study_minutes,
    } = profile;

    const goal = career_goal.trim();
    const level = experience_level.toLowerCase();

    if (level === "beginner") {
        return {
            title: `Build your foundation for ${goal}`,
            description:
                "Start by identifying the core skills required for your career goal and focus on learning one fundamental concept today.",
            estimated_minutes: daily_study_minutes,
            action_label: "Start learning",
        };
    }

    if (level === "intermediate") {
        return {
            title: `Strengthen your ${goal} skills`,
            description:
                "Choose one practical concept related to your career goal and apply it by building a small focused project or feature.",
            estimated_minutes: daily_study_minutes,
            action_label: "Continue journey",
        };
    }

    if (level === "advanced") {
        return {
            title: `Move closer to becoming a ${goal}`,
            description:
                "Focus on an advanced real-world challenge that strengthens your portfolio and demonstrates your technical expertise.",
            estimated_minutes: daily_study_minutes,
            action_label: "Take next step",
        };
    }

    return {
        title: `Continue your journey toward ${goal}`,
        description:
            "Focus on one meaningful learning action that moves you closer to your career goal.",
        estimated_minutes: daily_study_minutes,
        action_label: "Continue journey",
    };
}

export async function createUserJourney(
    userId: string,
    accessToken: string,
    profile: JourneyProfile
) {
    const supabase =
        createAuthenticatedSupabaseClient(accessToken);

    const { data: existingJourney, error: existingJourneyError } =
        await supabase
            .from("journeys")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();
    const { career_goal, daily_study_minutes } = profile;

    if (existingJourneyError) {
        throw existingJourneyError;
    }

    if (existingJourney) {
        return existingJourney;
    }

    const { data: journey, error: journeyError } =
        await supabase
            .from("journeys")
            .insert({
                user_id: userId,
                title: `${career_goal} Journey`,
                career_goal: career_goal,
                status: "active",
            })
            .select()
            .single();

    if (journeyError) {
        throw journeyError;
    }

    const milestones = generateInitialMilestones(career_goal).map(
        (milestone) => ({
            journey_id: journey.id,
            ...milestone,
        })
    );

    const {
        data: createdMilestones,
        error: milestonesError,
    } = await supabase
        .from("milestones")
        .insert(milestones)
        .select();

    if (milestonesError) {
        throw milestonesError;
    }

    const learningSteps = createdMilestones.flatMap(
        (milestone) =>
            generateInitialLearningSteps(
                milestone.title,
                milestone.position,
                daily_study_minutes
            ).map((step) => ({
                milestone_id: milestone.id,
                ...step,
            }))
    );

    const { error: learningStepsError } = await supabase
        .from("learning_steps")
        .insert(learningSteps);

    if (learningStepsError) {
        throw learningStepsError;
    }

    return journey;
}

function generateInitialMilestones(career_goal: string) {
    return [
        {
            title: "Build Your Foundation",
            description: `Learn and strengthen the core skills required for ${career_goal}.`,
            position: 1,
            status: "active",
        },
        {
            title: "Develop Practical Skills",
            description: `Apply your knowledge by building practical projects related to ${career_goal}.`,
            position: 2,
            status: "locked",
        },
        {
            title: "Become Job Ready",
            description: `Build your portfolio, strengthen advanced skills, and prepare for ${career_goal} opportunities.`,
            position: 3,
            status: "locked",
        },
    ];
}

function generateInitialLearningSteps(
    milestoneTitle: string,
    milestonePosition: number,
    dailyStudyMinutes: number
) {
    return [
        {
            title: `Understand ${milestoneTitle}`,
            description:
                "Learn the key concepts and understand why they matter.",
            position: 1,
            estimated_minutes: dailyStudyMinutes,
            status:
                milestonePosition === 1
                    ? "active"
                    : "locked",
        },
        {
            title: `Practice ${milestoneTitle}`,
            description:
                "Apply what you learned through focused practical work.",
            position: 2,
            estimated_minutes: dailyStudyMinutes,
            status: "locked",
        },
        {
            title: `Complete a ${milestoneTitle} challenge`,
            description:
                "Use your knowledge to complete a practical challenge.",
            position: 3,
            estimated_minutes: dailyStudyMinutes,
            status: "locked",
        },
    ];
}