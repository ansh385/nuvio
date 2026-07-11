import Button from "../ui/Button";
import "./NextStepCard.css";

interface NextStep {
    title: string;
    description: string;
    estimated_minutes: number;
    action_label: string;
}

interface NextStepCardProps {
    nextStep: NextStep;
}

function NextStepCard({ nextStep }: NextStepCardProps) {
    return (
        <section className="next-step-card">
            <div className="next-step-content">
                <span className="next-step-eyebrow">
                    YOUR NEXT STEP
                </span>

                <h2>{nextStep.title}</h2>

                <p className="next-step-description">
                    {nextStep.description}
                </p>

                <div className="next-step-meta">
                    <div className="next-step-meta-item">
                        <span>DAILY FOCUS</span>
                        <strong>
                            {nextStep.estimated_minutes} min
                        </strong>
                    </div>

                    <div className="next-step-meta-item">
                        <span>STATUS</span>
                        <strong>Ready to start</strong>
                    </div>
                </div>

                <div className="next-step-action">
                    <Button type="button">
                        {nextStep.action_label}
                    </Button>
                </div>
            </div>

            <div
                className="next-step-path"
                aria-hidden="true"
            >
                <div className="next-step-node completed" />

                <div className="next-step-line" />

                <div className="next-step-node current">
                    <span>1</span>
                </div>

                <div className="next-step-line inactive" />

                <div className="next-step-node" />
            </div>
        </section>
    );
}

export default NextStepCard;