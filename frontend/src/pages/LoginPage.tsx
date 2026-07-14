import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setIsLoading(true);
            setMessage("");

            const profile = await login(email, password);

            if (profile?.onboarding_completed) {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/onboarding", { replace: true });
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Login failed";

            setMessage(errorMessage);
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
                        <div className="signal-logo">N</div>

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
                    <span>AUTH_GATEWAY</span>

                    <span className="auth-id">NV-01</span>
                </div>

                <div className="auth-container">
                    <div className="mobile-brand">
                        <div className="signal-logo">N</div>

                        <span>NUVIO</span>
                    </div>

                    <div className="auth-heading">
                        <div className="auth-index">
                            <span>01</span>
                            <div />
                            <span>ACCESS</span>
                        </div>

                        <h2>Welcome back.</h2>

                        <p>
                            Authenticate to continue your developer journey.
                        </p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-header">
                                <label htmlFor="email">IDENTITY</label>
                                <span>01</span>
                            </div>

                            <div className="input-shell">
                                <span className="input-prefix">&gt;_</span>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="developer@email.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-header">
                                <label htmlFor="password">ACCESS KEY</label>
                                <span>02</span>
                            </div>

                            <div className="input-shell">
                                <span className="input-prefix">#</span>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {message && (
                            <div className="login-message">
                                <span>!</span>
                                {message}
                            </div>
                        )}

                        <button
                            className="login-button"
                            type="submit"
                            disabled={isLoading}
                        >
                            <span className="button-status">
                                <span className="button-dot" />

                                {isLoading
                                    ? "AUTHENTICATING..."
                                    : "INITIALIZE SESSION"}
                            </span>

                            {!isLoading && (
                                <span className="button-arrow">→</span>
                            )}
                        </button>
                    </form>

                    <div className="auth-security">
                        <div className="security-line" />

                        <div className="security-content">
                            <span className="security-dot" />

                            <span>
                                CONNECTION READY
                            </span>
                        </div>
                    </div>
                </div>

                <div className="auth-corner">
                    <span>35.00</span>
                    <span>72.00</span>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;