import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface PublicRouteProps {
    children: ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <p>Checking session...</p>;
    }

    if (isAuthenticated) {
        return <Navigate to="/onboarding" replace />;
    }

    return children;
}

export default PublicRoute;