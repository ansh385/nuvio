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
        <div className="command-page">
            <div className="command-grid" />

            <Sidebar />

            <main className="command-main">
                <DashboardHeader />

                <section className="command-content">
                    <div className="command-system-line">
                        <div className="command-system-id">
                            <span>NV://GUIDANCE_ENGINE</span>
                            <span>NODE_ID 03</span>
                        </div>

                        <div className="command-system-status">
                            <span className="command-status-dot" />
                            GUIDANCE SYSTEM ACTIVE
                        </div>
                    </div>

                    <div className="command-layout">
                        <section className="command-primary">
                            {isLoading && (
                                <div className="command-state">
                                    <span className="command-loader" />

                                    <div>
                                        <small>PROCESSING</small>
                                        <p>
                                            Preparing your next step...
                                        </p>
                                    </div>
                                </div>
                            )}

                            {!isLoading && error && (
                                <div className="command-state command-error">
                                    <span>!</span>

                                    <div>
                                        <small>SYSTEM ERROR</small>
                                        <p>{error}</p>
                                    </div>
                                </div>
                            )}

                            {!isLoading && !error && nextStep && (
                                <NextStepCard nextStep={nextStep} />
                            )}
                        </section>

                        <aside className="command-signal-panel">
                            <div className="signal-panel-header">
                                <div>
                                    <span>LIVE SIGNAL</span>
                                    <small>PROFILE ANALYSIS</small>
                                </div>

                                <span className="signal-panel-id">
                                    NV-03
                                </span>
                            </div>

                            <div className="guidance-processor">
                                <div className="processor-ring processor-ring-one" />
                                <div className="processor-ring processor-ring-two" />

                                <img className="processor-core" src="/brand/nuvio-mark.png" alt="NuvioLogo" />

                                <div className="processor-node processor-input">
                                    <span className="processor-light active" />

                                    <div>
                                        <small>INPUT</small>
                                        <strong>PROFILE</strong>
                                    </div>
                                </div>

                                <div className="processor-node processor-analysis">
                                    <span className="processor-light active" />

                                    <div>
                                        <small>ENGINE</small>
                                        <strong>ANALYZE</strong>
                                    </div>
                                </div>

                                <div className="processor-node processor-output">
                                    <span className="processor-light output" />

                                    <div>
                                        <small>OUTPUT</small>
                                        <strong>NEXT STEP</strong>
                                    </div>
                                </div>

                                <div className="processor-trace trace-input" />
                                <div className="processor-trace trace-output" />

                                <span className="processor-pulse pulse-input" />
                                <span className="processor-pulse pulse-output" />
                            </div>

                            <div className="signal-metrics">
                                <div className="signal-metric">
                                    <span>PROFILE</span>
                                    <strong>CALIBRATED</strong>
                                </div>

                                <div className="signal-metric">
                                    <span>GUIDANCE</span>
                                    <strong>ACTIVE</strong>
                                </div>

                                <div className="signal-metric">
                                    <span>PATH</span>
                                    <strong>READY</strong>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                <footer className="command-footer">
                    <span>NUVIO GUIDANCE SYSTEM</span>

                    <span>KNOW YOUR NEXT STEP.</span>

                    <span>NV / 03 / COMMAND</span>
                </footer>
            </main>
        </div>
    );
}

export default DashboardPage;