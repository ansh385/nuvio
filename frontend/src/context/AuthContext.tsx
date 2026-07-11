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

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function validateSession() {
            try {
                const response = await getCurrentUser();

                setUser(response.user);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        validateSession();
    }, []);

    async function login(email: string, password: string) {
        const response = await loginUser({
            email,
            password,
        });

        const accessToken = response.data.session.access_token;

        localStorage.setItem("access_token", accessToken);

        setUser(response.data.user);
    }

    function logout() {
        localStorage.removeItem("access_token");
        setUser(null);
    }

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}