import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/api";
import "./SignupPage.css";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {
            setIsLoading(true);
            setMessage("");

            await forgotPassword(email);

            setMessage(
                "✅ Reset link sent successfully. Check your email."
            );
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to send reset email"
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
                        <img src="/brand/nuvio-mark.png" alt="Nuvio Logo" className="signal-logo" />

                        <div>
                            <span className="signal-name">NUVIO</span>
                            <span className="signal-version">
                                SYSTEM / 01
                            </span>
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
                        Recover your account.
                        <span>Continue your path.</span>
                    </h1>

                    <p className="signal-description">
                        Enter your email and we'll send you a secure password reset link.
                    </p>
                </div>
            </section>

            <section className="auth-section">
                <div className="auth-top-line">
                    <span>PASSWORD RESET</span>

                    <span className="auth-id">NV-03</span>
                </div>

                <div className="auth-container">
                    <div className="auth-heading">
                        <div className="auth-index">
                            <span>03</span>
                            <div />
                            <span>RECOVERY</span>
                        </div>

                        <h2>Forgot your password?</h2>

                        <p>
                            Enter your developer email below.
                        </p>
                    </div>

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <div className="input-header">
                                <label htmlFor="email">
                                    IDENTITY
                                </label>

                                <span>01</span>
                            </div>

                            <div className="input-shell">
                                <span className="input-prefix">
                                    &gt;_
                                </span>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="developer@email.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
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
                            <span className="button-status">
                                <span className="button-dot" />

                                {isLoading
                                    ? "SENDING..."
                                    : "SEND RESET LINK"}
                            </span>
                        </button>
                    </form>

                    <div className="auth-switch">
                        <span>Remember your password?</span>

                        <Link to="/login">
                            Sign In →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ForgotPasswordPage;