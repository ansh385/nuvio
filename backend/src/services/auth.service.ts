import { supabase } from "../config/supabase";

interface SignUpData {
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export async function signUpUser({ email, password }: SignUpData) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    return data;
}

export async function loginUser({ email, password }: LoginData) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    return data;
}