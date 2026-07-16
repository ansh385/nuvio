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

interface SignupData {
    email: string;
    password: string;
}

export async function signupUser(signupData: SignupData) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Signup failed");
    }

    return data;
}

export async function forgotPassword(email: string) {
    const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to send reset email"
        );
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

export async function getCurrentUser() {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        localStorage.removeItem("access_token");
        throw new Error(data.message || "Session expired");
    }

    return data;
}

export async function getNextStep() {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        throw new Error("Authentication required");
    }

    const response = await fetch(
        `${API_BASE_URL}/journey/next-step`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to load next step"
        );
    }

    return data;
}

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function updatePassword(
    password: string
) {
    const { data, error } =
        await supabase.auth.updateUser({
            password,
        });

    if (error) {
        throw error;
    }

    return data;
}