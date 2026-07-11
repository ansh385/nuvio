import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "./LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {
            setIsLoading(true);
            setMessage("");

            const profile = await login(email, password);

            if (profile?.onboarding_completed) {
                navigate("/dashboard");
            } else {
                navigate("/onboarding");
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
            <div className="login-glow login-glow-left" />
            <div className="login-glow login-glow-right" />

            <section className="login-container">
                <header className="login-brand">
                    <img src="/brand/nuvio-mark.png" alt="Nuvio" />

                    <span className="login-brand-name">
                        NUVIO
                    </span>
                </header>

                <div className="login-card">
                    <div className="login-heading">
                        <span className="login-eyebrow">
                            YOUR NEXT STEP STARTS HERE
                        </span>

                        <h1>Welcome back</h1>

                        <p>
                            Continue your journey with personalized
                            guidance built around your goals.
                        </p>
                    </div>

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            id="email"
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                        {message && (
                            <p className="login-message">
                                {message}
                            </p>
                        )}

                        <Button
                            type="submit"
                            isLoading={isLoading}
                        >
                            Continue to Nuvio
                        </Button>
                    </form>
                </div>

                <p className="login-tagline">
                    Know your next step.
                </p>
            </section>
        </main>
    );
}

export default LoginPage;