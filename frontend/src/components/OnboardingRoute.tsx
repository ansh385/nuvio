import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface OnboardingRouteProps {
    children: ReactNode;
}

function OnboardingRoute({ children }: OnboardingRouteProps) {
    const {
        isLoading,
        isAuthenticated,
        profile,
    } = useAuth();

    if (isLoading) {
        return <p>Checking session...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (profile?.onboarding_completed) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default OnboardingRoute;