import { useState } from "react";
import { completeOnboarding } from "../services/api";

function OnboardingPage() {
    const [formData, setFormData] = useState({
        full_name: "",
        career_goal: "",
        experience_level: "Beginner",
        daily_study_minutes: 60,
    });

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setIsLoading(true);
            setMessage("");

            await completeOnboarding(formData);

            setMessage("Onboarding completed successfully");
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Onboarding failed";

            setMessage(message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <h1>Tell us about yourself</h1>

            <p>Help Nuvio understand your goals and experience.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="full_name">Full Name</label>

                    <input
                        id="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                full_name: event.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <label htmlFor="career_goal">Career Goal</label>

                    <input
                        id="career_goal"
                        type="text"
                        value={formData.career_goal}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                career_goal: event.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <label htmlFor="experience_level">
                        Experience Level
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
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="daily_study_minutes">
                        Daily Study Time
                    </label>

                    <input
                        id="daily_study_minutes"
                        type="number"
                        min="15"
                        max="720"
                        value={formData.daily_study_minutes}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                daily_study_minutes: Number(event.target.value),
                            })
                        }
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Complete Onboarding"}
                </button>
            </form>

            {message && <p>{message}</p>}
        </main>
    );
}

export default OnboardingPage;