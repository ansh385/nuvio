import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import "./SignupPage.css";

function SignupPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function getPasswordStrength(password: string) {
        if (password.length < 6) return "Weak";

        if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        ) {
            return "Strong";
        }

        return "Medium";
    }

    const passwordStrength =
        getPasswordStrength(password);


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setIsLoading(true);
            setMessage("");

            if (password !== confirmPassword) {
                setMessage("Passwords do not match");
                return;
            }

            await signupUser({
                email,
                password,
            });

            setMessage(
                "✅ Account created successfully. Redirecting..."
            );

            setTimeout(() => {
                navigate("/login", {
                    replace: true,
                });
            }, 1200);


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
                        <img src="/brand/nuvio-mark.png" alt="Nuvio Logo" className="signal-logo" />

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
                    <span>REGISTRATION</span>

                    <span className="auth-id">NV-01</span>
                </div>

                <div className="auth-container">
                    <div className="mobile-brand">
                        <div className="signal-logo">N</div>

                        <span>NUVIO</span>
                    </div>

                    <div className="auth-heading">
                        <div className="auth-index">
                            <span>02</span>
                            <div />
                            <span>REGISTRATION</span>
                        </div>

                        <h2>Create your account.</h2>

                        <p>
                            Join Nuvio and start your personalized developer journey.
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
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-header">
                                <label htmlFor="confirmPassword">
                                    CONFIRM PASSWORD
                                </label>
                                <span>03</span>
                            </div>

                            <div className="input-shell">
                                <span className="input-prefix">#</span>

                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? "🙈" : "👁"}
                                </button>
                            </div>

                        </div>
                        {confirmPassword && (
                            <div className="password-match">
                                {password === confirmPassword
                                    ? "✅ Passwords match"
                                    : "❌ Passwords do not match"}
                            </div>
                        )}
                        {password && (
                            <div className="password-strength">
                                Password Strength:{""}

                                <strong className={passwordStrength.toLowerCase()}>
                                    {passwordStrength}
                                </strong>
                            </div>
                        )}

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
                                    ? "CREATING ACCOUNT..."
                                    : "CREATE ACCOUNT"}
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
                    <div className="auth-switch">
                        <span>Already have an account?</span>

                        <Link to="/login">
                            Sign In →
                        </Link>
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

export default SignupPage;