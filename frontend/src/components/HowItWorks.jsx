import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    icon: "⌕",
    title: "Choose a Service",
    description:
      "Explore available services and find exactly what you need from our growing service network.",
  },
  {
    number: "02",
    icon: "◷",
    title: "Pick Your Time",
    description:
      "Select a convenient date and available time slot that fits perfectly into your schedule.",
  },
  {
    number: "03",
    icon: "✓",
    title: "Confirm Booking",
    description:
      "Review your appointment details and confirm your booking in just a few clicks.",
  },
  {
    number: "04",
    icon: "◈",
    title: "Manage Anytime",
    description:
      "View your upcoming appointments, track booking status, or cancel when your plans change.",
  },
];

function HowItWorks() {
  return (
    <section
      className="how-it-works-section"
      id="how-it-works"
    >
      {/* Background effects */}
      <div className="workflow-glow workflow-glow-purple"></div>
      <div className="workflow-glow workflow-glow-green"></div>

      <div className="container">

        {/* =====================================
            HEADING
           ===================================== */}

        <div className="workflow-heading">

          <div className="workflow-title-wrapper">

            <span className="section-eyebrow">
              HOW BOOKEASE WORKS
            </span>

            <h2>
              Booking made
              <span> effortless.</span>
            </h2>

          </div>

          <p>
            From discovering a service to managing your
            appointment, everything is designed around
            one simple experience.
          </p>

        </div>


        {/* =====================================
            WORKFLOW
           ===================================== */}

        <div className="workflow-container">

          {/* Connecting line */}

          <div className="workflow-line">
            <div className="workflow-line-progress"></div>
          </div>


          {/* Steps */}

          <div className="workflow-grid">

            {steps.map((step, index) => (

              <div
                className="workflow-step"
                key={step.number}
              >

                {/* Number / Icon */}

                <div className="workflow-node">

                  <div className="workflow-node-inner">
                    {step.icon}
                  </div>

                  <span className="workflow-number">
                    {step.number}
                  </span>

                </div>


                {/* Content */}

                <div className="workflow-content">

                  <span className="workflow-step-label">
                    STEP {step.number}
                  </span>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                </div>


                {/* Arrow between cards */}

                {index < steps.length - 1 && (
                  <div className="workflow-arrow">
                    →
                  </div>
                )}

              </div>

            ))}

          </div>

        </div>


        {/* =====================================
            BOTTOM HIGHLIGHT
           ===================================== */}

        <div className="workflow-highlight">

          <div className="highlight-icon">
            ✦
          </div>

          <div className="highlight-content">

            <strong>
              Your time matters.
            </strong>

            <span>
              Book ahead and avoid unnecessary waiting.
            </span>

          </div>

          <div className="highlight-status">

            <span></span>

            Simple &amp; Fast

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;