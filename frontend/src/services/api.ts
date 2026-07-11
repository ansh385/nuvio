const API_BASE_URL = "http://localhost:5000/api";

interface LoginData {
    email: string;
    password: string;
}

export async function loginUser(loginData: LoginData) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
}

interface OnboardingData {
    full_name: string;
    career_goal: string;
    experience_level: string;
    daily_study_minutes: number;
}

export async function completeOnboarding(onboardingData: OnboardingData) {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        throw new Error("You must be logged in");
    }

    const response = await fetch(`${API_BASE_URL}/profile/onboarding`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(onboardingData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Onboarding failed");
    }

    return data;
}