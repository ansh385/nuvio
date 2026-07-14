import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeOnboarding } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./OnboardingPage.css";

function OnboardingPage() {
    const navigate = useNavigate();
    const { logout, refreshAuth } = useAuth();

    const [formData, setFormData] = useState({
        full_name: "",
        career_goal: "",
        experience_level: "Beginner",
        daily_study_minutes: 60,
    });

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {
            setIsLoading(true);
            setMessage("");

            await completeOnboarding(formData);

            await refreshAuth();

            navigate("/dashboard", { replace: true });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Onboarding failed";

            setMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="calibration-page">
            <div className="calibration-grid" />

            <header className="calibration-header">
                <div className="calibration-brand">
                    <img className="calibration-logo" src="/brand/nuvio-mark.png" alt="NuvioLogo" />

                    <div>
                        <span className="calibration-name">NUVIO</span>
                        <span className="calibration-version">
                            PROFILE SYSTEM / 01
                        </span>
                    </div>
                </div>

                <div className="calibration-header-right">
                    <div className="calibration-status">
                        <span className="status-light" />
                        CALIBRATION ACTIVE
                    </div>

                    <button
                        type="button"
                        className="calibration-logout"
                        onClick={handleLogout}
                    >
                        EXIT SESSION
                    </button>
                </div>
            </header>

            <div className="calibration-layout">
                <section className="calibration-visual">
                    <div className="visual-code">
                        <span>NV://PROFILE_CALIBRATION</span>
                        <span>NODE_ID 02</span>
                    </div>

                    <h1>
                        Your path starts
                        <span>with your signal.</span>
                    </h1>

                    <p className="visual-description">
                        Tell Nuvio where you are today. The system uses
                        your goals, experience, and available time to
                        prepare your personalized direction.
                    </p>

                    <div className="profile-signal">
                        <div className="signal-core">
                            <div className="core-ring core-ring-one" />
                            <div className="core-ring core-ring-two" />

                            <div className="core-center">
                                <img className="calibration-logo" src="/brand/nuvio-mark.png" alt="NuvioLogo" />
                            </div>
                        </div>

                        <div className="profile-node identity-node">
                            <span className="profile-node-light active" />

                            <div>
                                <small>INPUT_01</small>
                                <strong>IDENTITY</strong>
                            </div>
                        </div>

                        <div className="profile-node goal-node">
                            <span className="profile-node-light" />

                            <div>
                                <small>INPUT_02</small>
                                <strong>GOAL</strong>
                            </div>
                        </div>

                        <div className="profile-node experience-node">
                            <span className="profile-node-light" />

                            <div>
                                <small>INPUT_03</small>
                                <strong>EXPERIENCE</strong>
                            </div>
                        </div>

                        <div className="profile-node commitment-node">
                            <span className="profile-node-light output" />

                            <div>
                                <small>INPUT_04</small>
                                <strong>COMMITMENT</strong>
                            </div>
                        </div>

                        <div className="profile-trace trace-one" />
                        <div className="profile-trace trace-two" />
                        <div className="profile-trace trace-three" />
                        <div className="profile-trace trace-four" />

                        <span className="calibration-pulse pulse-one" />
                        <span className="calibration-pulse pulse-two" />
                    </div>

                    <div className="visual-footer">
                        <span>4 INPUT NODES</span>
                        <span>PROFILE ENCRYPTED</span>
                        <span>READY FOR CALIBRATION</span>
                    </div>
                </section>

                <section className="calibration-form-section">
                    <div className="form-system-header">
                        <div>
                            <span>02</span>
                            <div />
                            <span>PROFILE INPUT</span>
                        </div>

                        <span>4 PARAMETERS</span>
                    </div>

                    <div className="calibration-heading">
                        <h2>Initialize your profile.</h2>

                        <p>
                            These inputs help Nuvio understand your
                            current position and generate your next step.
                        </p>
                    </div>

                    <form
                        className="calibration-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="calibration-field">
                            <div className="field-header">
                                <label htmlFor="full_name">
                                    IDENTITY
                                </label>

                                <span>01</span>
                            </div>

                            <div className="calibration-input-shell">
                                <span>&gt;_</span>

                                <input
                                    id="full_name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.full_name}
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            full_name: event.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="calibration-field">
                            <div className="field-header">
                                <label htmlFor="career_goal">
                                    TARGET SIGNAL
                                </label>

                                <span>02</span>
                            </div>

                            <div className="calibration-input-shell">
                                <span>↗</span>

                                <input
                                    id="career_goal"
                                    type="text"
                                    placeholder="Example: IoT Engineer"
                                    value={formData.career_goal}
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            career_goal: event.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="calibration-field-row">
                            <div className="calibration-field">
                                <div className="field-header">
                                    <label htmlFor="experience_level">
                                        EXPERIENCE
                                    </label>

                                    <span>03</span>
                                </div>

                                <div className="calibration-select-shell">
                                    <select
                                        id="experience_level"
                                        value={formData.experience_level}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                experience_level:
                                                    event.target.value,
                                            })
                                        }
                                    >
                                        <option value="Beginner">
                                            Beginner
                                        </option>

                                        <option value="Intermediate">
                                            Intermediate
                                        </option>

                                        <option value="Advanced">
                                            Advanced
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="calibration-field">
                                <div className="field-header">
                                    <label htmlFor="daily_study_minutes">
                                        DAILY CAPACITY
                                    </label>

                                    <span>04</span>
                                </div>

                                <div className="calibration-input-shell">
                                    <span>⏱</span>

                                    <input
                                        id="daily_study_minutes"
                                        type="number"
                                        min="15"
                                        max="720"
                                        value={
                                            formData.daily_study_minutes
                                        }
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                daily_study_minutes:
                                                    Number(
                                                        event.target.value
                                                    ),
                                            })
                                        }
                                        required
                                    />

                                    <small>MIN</small>
                                </div>
                            </div>
                        </div>

                        {message && (
                            <div className="calibration-message">
                                <span>!</span>
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="calibration-button"
                            disabled={isLoading}
                        >
                            <span className="calibration-button-content">
                                <span className="button-signal" />

                                {isLoading
                                    ? "CALIBRATING PROFILE..."
                                    : "GENERATE MY PATH"}
                            </span>

                            {!isLoading && (
                                <span className="calibration-arrow">
                                    →
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="form-security-status">
                        <div />

                        <p>
                            <span />
                            INPUT CHANNEL SECURE
                        </p>
                    </div>
                </section>
            </div>

            <footer className="calibration-bottom">
                <span>NUVIO GUIDANCE SYSTEM</span>
                <span>KNOW YOUR NEXT STEP.</span>
                <span>NV / 02 / PROFILE</span>
            </footer>
        </main>
    );
}

export default OnboardingPage;