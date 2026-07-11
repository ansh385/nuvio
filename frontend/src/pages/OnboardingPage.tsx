import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeOnboarding } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "./OnboardingPage.css";

function OnboardingPage() {
    const navigate = useNavigate();
    const { logout } = useAuth();

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

            navigate("/dashboard");
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
        <main className="onboarding-page">
            <div className="onboarding-glow onboarding-glow-left" />
            <div className="onboarding-glow onboarding-glow-right" />

            <section className="onboarding-container">
                <header className="onboarding-header">
                    <div className="onboarding-brand">
                        <img
                            src="/brand/nuvio-mark.png"
                            alt="Nuvio"
                        />

                        <span>NUVIO</span>
                    </div>

                    <button
                        className="onboarding-logout"
                        type="button"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </header>

                <div className="onboarding-progress">
                    <div className="onboarding-progress-info">
                        <span>SET UP YOUR JOURNEY</span>
                        <span>STEP 1 OF 1</span>
                    </div>

                    <div className="onboarding-progress-track">
                        <div className="onboarding-progress-value" />
                    </div>
                </div>

                <div className="onboarding-card">
                    <div className="onboarding-heading">
                        <span className="onboarding-eyebrow">
                            PERSONALIZE YOUR PATH
                        </span>

                        <h1>Tell us about yourself</h1>

                        <p>
                            Help Nuvio understand where you are and where
                            you want to go. We’ll use this to shape your
                            personalized developer journey.
                        </p>
                    </div>

                    <form
                        className="onboarding-form"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            id="full_name"
                            label="Full name"
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

                        <Input
                            id="career_goal"
                            label="Career goal"
                            type="text"
                            placeholder="Example: Become a frontend developer"
                            value={formData.career_goal}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    career_goal: event.target.value,
                                })
                            }
                            required
                        />

                        <div className="onboarding-field">
                            <label htmlFor="experience_level">
                                Experience level
                            </label>

                            <select
                                id="experience_level"
                                value={formData.experience_level}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        experience_level: event.target.value,
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

                        <Input
                            id="daily_study_minutes"
                            label="Daily study time"
                            type="number"
                            min="15"
                            max="720"
                            value={formData.daily_study_minutes}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    daily_study_minutes: Number(
                                        event.target.value
                                    ),
                                })
                            }
                            required
                        />

                        {message && (
                            <p
                                className={
                                    message.includes("successfully")
                                        ? "onboarding-message success"
                                        : "onboarding-message error"
                                }
                            >
                                {message}
                            </p>
                        )}

                        <Button
                            type="submit"
                            isLoading={isLoading}
                        >
                            Create my journey
                        </Button>
                    </form>
                </div>

                <p className="onboarding-footer">
                    Know your next step.
                </p>
            </section>
        </main>
    );
}

export default OnboardingPage;