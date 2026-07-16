import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updatePassword } from "../services/api";
import "./SignupPage.css";

function ResetPasswordPage() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);
            setMessage("");

            await updatePassword(password);

            setMessage(
                "Password updated successfully."
            );

            setTimeout(() => {
                navigate("/login", {
                    replace: true,
                });
            }, 1500);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to update password"
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="login-page">
            <section className="signal-section">
                <div className="signal-grid" />

                <header className="signal-header">
                    <div className="signal-brand">
                        <img className="signal-logo" src="/brand/nuvio-mark.png" alt="Nuvio Logo" />

                        <div>
                            <span className="signal-name">NUVIO</span>
                            <span className="signal-version">SYSTEM / 01</span>
                        </div>
                    </div>

                    <div className="system-status">
                        <span className="system-status-dot" />
                        SYSTEM ONLINE
                    </div>
                </header>

                <div className="signal-content">
                    <div className="signal-code">
                        <span>NV://GUIDANCE_SYSTEM</span>
                        <span>NODE_ID 01</span>
                    </div>

                    <h1>
                        Find the signal.
                        <span>Build your path.</span>
                    </h1>

                    <p className="signal-description">
                        Personalized developer guidance powered by your goals,
                        skills, progress, and direction.
                    </p>

                    <div className="network-system">
                        <div className="circuit circuit-one" />
                        <div className="circuit circuit-two" />
                        <div className="circuit circuit-three" />

                        <div className="network-node node-input">
                            <span className="node-light" />

                            <div>
                                <small>INPUT</small>
                                <strong>YOU</strong>
                            </div>
                        </div>

                        <div className="network-node node-profile">
                            <span className="node-light" />

                            <div>
                                <small>ANALYZE</small>
                                <strong>PROFILE</strong>
                            </div>
                        </div>

                        <div className="network-node node-guidance">
                            <span className="node-light active-light" />

                            <div>
                                <small>PROCESS</small>
                                <strong>GUIDANCE</strong>
                            </div>
                        </div>

                        <div className="network-node node-output">
                            <span className="node-light output-light" />

                            <div>
                                <small>OUTPUT</small>
                                <strong>NEXT STEP</strong>
                            </div>
                        </div>

                        <span className="signal-pulse signal-pulse-one" />
                        <span className="signal-pulse signal-pulse-two" />
                    </div>
                </div>

                <footer className="signal-footer">
                    <span>SECURE CONNECTION</span>
                    <span>256-BIT SESSION</span>
                    <span>KNOW YOUR NEXT STEP.</span>
                </footer>
            </section>

            <section className="auth-section">

                <div className="auth-top-line">
                    <span>PASSWORD RESET</span>
                    <span className="auth-id">NV-01</span>
                </div>

                <div className="auth-container"></div>
                <div className="auth-container">
                    <div className="mobile-brand">
                        <img
                            className="signal-logo"
                            src="/brand/nuvio-mark.png"
                            alt="Nuvio Logo"
                        />

                        <span>NUVIO</span>
                    </div>
                    <div className="auth-heading">

                        <div className="auth-index">
                            <span>03</span>
                            <div />
                            <span>RECOVERY</span>
                        </div>
                        <h2>Reset your password.</h2>

                        <p>
                            Create a new password for your Nuvio account.
                        </p>
                    </div>

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <div className="input-header">
                                <label htmlFor="password">
                                    NEW PASSWORD
                                </label>

                                <span>01</span>
                            </div>

                            <div className="input-shell">
                                <span className="input-prefix">
                                    #
                                </span>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-header">
                                <label htmlFor="confirmPassword">
                                    CONFIRM PASSWORD
                                </label>

                                <span>02</span>
                            </div>

                            <div className="input-shell">
                                <span className="input-prefix">
                                    #
                                </span>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(
                                            event.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {message && (
                            <div className="login-message">
                                {message}
                            </div>
                        )}

                        <button
                            className="login-button"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "UPDATING PASSWORD..."
                                : "UPDATE PASSWORD"}
                        </button>
                    </form>

                    <div className="auth-security">
                        <div className="security-line" />

                        <div className="security-content">
                            <span className="security-dot" />
                            <span>CONNECTION READY</span>
                        </div>
                    </div>

                    <div className="auth-switch">
                        <span>Remember your password?</span>

                        <Link to="/login">
                            Back to Login →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ResetPasswordPage;