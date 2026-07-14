import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <aside className="command-sidebar">
            <div className="command-sidebar-top">
                <div className="command-brand">
                    <img className="command-logo" src="/brand/nuvio-mark.png" alt="NuvioLogo" />

                    <div className="command-brand-info">
                        <span>NUVIO</span>
                        <small>GUIDANCE SYSTEM</small>
                    </div>
                </div>

                <div className="sidebar-system-status">
                    <span className="sidebar-status-dot" />

                    <div>
                        <small>SYSTEM STATUS</small>
                        <strong>ONLINE</strong>
                    </div>
                </div>
            </div>

            <nav className="command-navigation">
                <div className="navigation-label">
                    <span>NAVIGATION</span>
                    <span>04 NODES</span>
                </div>

                <button
                    className="command-nav-item active"
                    type="button"
                >
                    <span className="nav-index">
                        01
                    </span>

                    <span className="nav-node">
                        <span />
                    </span>

                    <span className="nav-content">
                        <strong>COMMAND</strong>
                        <small>Dashboard</small>
                    </span>

                    <span className="nav-arrow">
                        →
                    </span>
                </button>

                <button
                    className="command-nav-item"
                    type="button"
                >
                    <span className="nav-index">
                        02
                    </span>

                    <span className="nav-node">
                        <span />
                    </span>

                    <span className="nav-content">
                        <strong>PATH</strong>
                        <small>My Journey</small>
                    </span>

                    <span className="nav-arrow">
                        →
                    </span>
                </button>

                <button
                    className="command-nav-item"
                    type="button"
                >
                    <span className="nav-index">
                        03
                    </span>

                    <span className="nav-node">
                        <span />
                    </span>

                    <span className="nav-content">
                        <strong>CHRONICLE</strong>
                        <small>Activity log</small>
                    </span>

                    <span className="nav-arrow">
                        →
                    </span>
                </button>

                <button
                    className="command-nav-item"
                    type="button"
                >
                    <span className="nav-index">
                        04
                    </span>

                    <span className="nav-node">
                        <span />
                    </span>

                    <span className="nav-content">
                        <strong>IDENTITY</strong>
                        <small>Profile</small>
                    </span>

                    <span className="nav-arrow">
                        →
                    </span>
                </button>
            </nav>

            <div className="sidebar-signal">
                <div className="sidebar-signal-header">
                    <span>NETWORK SIGNAL</span>
                    <span>98%</span>
                </div>

                <div className="sidebar-signal-track">
                    <div className="sidebar-signal-value" />

                    <span className="sidebar-signal-pulse" />
                </div>

                <div className="sidebar-signal-info">
                    <span>PROFILE CONNECTED</span>
                    <span>NV-USER</span>
                </div>
            </div>

            <div className="command-sidebar-footer">
                <div className="sidebar-footer-status">
                    <span className="sidebar-footer-light" />

                    <div>
                        <small>SESSION</small>
                        <strong>SECURE CONNECTION</strong>
                    </div>
                </div>

                <button
                    className="command-logout"
                    type="button"
                    onClick={handleLogout}
                >
                    <span>EXIT SESSION</span>
                    <span>↗</span>
                </button>

                <p>KNOW YOUR NEXT STEP.</p>
            </div>
        </aside>
    );
}

export default Sidebar;