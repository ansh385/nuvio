import { useAuth } from "../../context/AuthContext";
import "./DashboardHeader.css";

function DashboardHeader() {
    const { profile } = useAuth();

    const firstName = profile?.full_name?.split(" ")[0] || "Developer";

    return (
        <header className="dashboard-header">
            <div className="dashboard-header-content">
                <span className="dashboard-header-eyebrow">
                    YOUR JOURNEY
                </span>

                <h1>Welcome back, {firstName}</h1>

                <p>
                    Stay focused on what matters. Here’s your next step.
                </p>
            </div>

            <div className="dashboard-profile">
                <div className="dashboard-profile-avatar">
                    {firstName.charAt(0).toUpperCase()}
                </div>

                <div className="dashboard-profile-info">
                    <span>{profile?.full_name || "Developer"}</span>

                    <p>{profile?.experience_level || "Beginner"}</p>
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;