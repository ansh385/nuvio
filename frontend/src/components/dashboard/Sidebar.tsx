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
        <aside className="dashboard-sidebar">
            <div className="sidebar-brand">
                <img src="/brand/nuvio-mark.png" alt="Nuvio" />

                <span>NUVIO</span>
            </div>

            <nav className="sidebar-navigation">
                <button className="sidebar-link active" type="button">
                    Dashboard
                </button>

                <button className="sidebar-link" type="button">
                    My Journey
                </button>

                <button className="sidebar-link" type="button">
                    Chronicle
                </button>

                <button className="sidebar-link" type="button">
                    Profile
                </button>
            </nav>

            <div className="sidebar-footer">
                <p>Know your next step.</p>

                <button
                    className="sidebar-logout"
                    type="button"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;