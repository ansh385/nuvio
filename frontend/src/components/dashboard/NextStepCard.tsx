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
        <section className="guidance-card">
            <div className="guidance-card-grid" />

            <header className="guidance-card-header">
                <div className="guidance-status">
                    <span className="guidance-status-light" />

                    <div>
                        <small>ACTIVE SIGNAL</small>
                        <strong>YOUR NEXT STEP</strong>
                    </div>
                </div>

                <span className="guidance-id">
                    NV-GUIDE / 001
                </span>
            </header>

            <div className="guidance-content">
                <div className="guidance-index">
                    <span>01</span>
                    <div />
                    <span>RECOMMENDED ACTION</span>
                </div>

                <h2>{nextStep.title}</h2>

                <p className="guidance-description">
                    {nextStep.description}
                </p>

                <div className="guidance-data">
                    <div className="guidance-data-item">
                        <span>TIME ALLOCATION</span>

                        <strong>
                            {nextStep.estimated_minutes}
                            <small> MIN</small>
                        </strong>
                    </div>

                    <div className="guidance-data-divider" />

                    <div className="guidance-data-item">
                        <span>SIGNAL STATUS</span>

                        <strong className="ready-status">
                            <span />
                            READY
                        </strong>
                    </div>

                    <div className="guidance-data-divider" />

                    <div className="guidance-data-item">
                        <span>PRIORITY</span>

                        <strong>PRIMARY</strong>
                    </div>
                </div>

                <button
                    type="button"
                    className="guidance-action"
                >
                    <span className="guidance-action-content">
                        <span className="guidance-action-pulse" />

                        {nextStep.action_label}
                    </span>

                    <span className="guidance-action-arrow">
                        →
                    </span>
                </button>
            </div>

            <div
                className="guidance-path-system"
                aria-hidden="true"
            >
                <div className="path-system-label">
                    <span>PATH SIGNAL</span>
                    <span>01 / 03</span>
                </div>

                <div className="path-system-visual">
                    <div className="path-trace" />

                    <div className="path-checkpoint completed">
                        <span className="checkpoint-node">
                            ✓
                        </span>

                        <div>
                            <small>PROFILE</small>
                            <strong>CALIBRATED</strong>
                        </div>
                    </div>

                    <div className="path-checkpoint current">
                        <span className="checkpoint-node">
                            01
                        </span>

                        <div>
                            <small>CURRENT</small>
                            <strong>NEXT STEP</strong>
                        </div>
                    </div>

                    <div className="path-checkpoint locked">
                        <span className="checkpoint-node">
                            02
                        </span>

                        <div>
                            <small>AWAITING</small>
                            <strong>NEXT SIGNAL</strong>
                        </div>
                    </div>

                    <span className="path-moving-signal" />
                </div>

                <div className="path-system-footer">
                    <span>GUIDANCE ENGINE</span>

                    <span className="path-processing">
                        <span />
                        PROCESSING CONTINUOUSLY
                    </span>
                </div>
            </div>
        </section>
    );
}

export default NextStepCard;