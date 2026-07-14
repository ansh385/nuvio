import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { getCurrentUser } from "../services/api";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuthentication() {
            try {
                setIsLoading(true);

                await getCurrentUser();

                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }

        checkAuthentication();
    }, [location.pathname]);

    if (isLoading) {
        return <p>Checking session...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;