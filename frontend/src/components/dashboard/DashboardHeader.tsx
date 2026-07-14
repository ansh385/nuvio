import { useAuth } from "../../context/AuthContext";
import "./DashboardHeader.css";

function DashboardHeader() {
    const { profile } = useAuth();

    const firstName =
        profile?.full_name?.split(" ")[0] || "Developer";

    const initial =
        firstName.charAt(0).toUpperCase();

    return (
        <header className="command-header">
            <div className="command-header-content">
                <div className="command-header-index">
                    <span>03</span>

                    <div />

                    <span>COMMAND CENTER</span>
                </div>

                <h1>
                    Welcome back,
                    <span>{firstName}.</span>
                </h1>

                <p>
                    Your profile is calibrated. Nuvio is tracking your
                    direction and preparing the next signal.
                </p>
            </div>

            <div className="command-header-profile">
                <div className="profile-connection">
                    <span className="profile-connection-dot" />

                    <div>
                        <small>IDENTITY CONNECTED</small>
                        <strong>SESSION ACTIVE</strong>
                    </div>
                </div>

                <div className="command-profile-card">
                    <div className="command-profile-avatar">
                        <span>{initial}</span>

                        <div className="avatar-signal" />
                    </div>

                    <div className="command-profile-info">
                        <span>
                            {profile?.full_name || "Developer"}
                        </span>

                        <div>
                            <small>
                                {profile?.experience_level || "Beginner"}
                            </small>

                            <span />

                            <small>CALIBRATED</small>
                        </div>
                    </div>

                    <span className="profile-card-id">
                        ID
                    </span>
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;