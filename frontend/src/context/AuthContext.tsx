import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    getCurrentUser,
    loginUser,
} from "../services/api";

interface User {
    id: string;
    email?: string;
}

interface Profile {
    id: string;
    full_name: string | null;
    career_goal: string | null;
    experience_level: string | null;
    daily_study_minutes: number | null;
    onboarding_completed: boolean;
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<Profile | null>;
    logout: () => void;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    async function refreshAuth() {
        try {
            const response = await getCurrentUser();

            setUser(response.user);
            setProfile(response.profile);
        } catch {
            setUser(null);
            setProfile(null);
        }
    }

    useEffect(() => {
        async function validateSession() {
            try {
                await refreshAuth();
            } finally {
                setIsLoading(false);
            }
        }

        validateSession();
    }, []);

    async function login(
        email: string,
        password: string
    ): Promise<Profile | null> {
        const response = await loginUser({
            email,
            password,
        });

        const accessToken = response.data.session.access_token;

        localStorage.setItem("access_token", accessToken);

        const currentUserResponse = await getCurrentUser();

        setUser(currentUserResponse.user);
        setProfile(currentUserResponse.profile);

        return currentUserResponse.profile;
    }

    function logout() {
        localStorage.removeItem("access_token");

        setUser(null);
        setProfile(null);
    }

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                isLoading,
                isAuthenticated,
                login,
                logout,
                refreshAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}