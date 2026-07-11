import { createAuthenticatedSupabaseClient } from "../config/authenticated-supabase";

interface UpdateProfileData {
    full_name: string;
    career_goal: string;
    experience_level: string;
    daily_study_minutes: number;
}

export async function updateUserProfile(
    userId: string,
    accessToken: string,
    profileData: UpdateProfileData
) {
    const supabase = createAuthenticatedSupabaseClient(accessToken);

    const { data, error } = await supabase
        .from("profiles")
        .update({
            full_name: profileData.full_name,
            career_goal: profileData.career_goal,
            experience_level: profileData.experience_level,
            daily_study_minutes: profileData.daily_study_minutes,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}