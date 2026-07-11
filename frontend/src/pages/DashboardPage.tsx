import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import NextStepCard from "../components/dashboard/NextStepCard";
import { getNextStep } from "../services/api";
import "./DashboardPage.css";

interface NextStep {
    title: string;
    description: string;
    estimated_minutes: number;
    action_label: string;
}

function DashboardPage() {
    const [nextStep, setNextStep] = useState<NextStep | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadNextStep() {
            try {
                setIsLoading(true);
                setError("");

                const response = await getNextStep();

                setNextStep(response.data.next_step);
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Failed to load your next step";

                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        }

        loadNextStep();
    }, []);

    return (
        <div className="dashboard-page">
            <Sidebar />

            <main className="dashboard-main">
                <DashboardHeader />

                <section className="dashboard-content">
                    {isLoading && (
                        <div className="dashboard-state-card">
                            <p>Preparing your next step...</p>
                        </div>
                    )}

                    {!isLoading && error && (
                        <div className="dashboard-state-card dashboard-error">
                            <p>{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && nextStep && (
                        <NextStepCard nextStep={nextStep} />
                    )}
                </section>
            </main>
        </div>
    );
}

export default DashboardPage;