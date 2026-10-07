import "./WhyChooseUs.css";

const features = [
  {
    icon: "◷",
    title: "Smart Availability",
    description:
      "See available time slots instantly and choose a time that works around your schedule.",
    accent: "purple",
  },
  {
    icon: "⚡",
    title: "Fast Booking",
    description:
      "Find a service, choose your slot, and confirm your appointment without unnecessary steps.",
    accent: "green",
  },
  {
    icon: "◈",
    title: "One Place",
    description:
      "Keep your upcoming and previous appointments organized in one simple dashboard.",
    accent: "blue",
  },
  {
    icon: "✓",
    title: "Reliable Experience",
    description:
      "Designed to make every appointment clear, predictable, and easy to manage.",
    accent: "gold",
  },
];

function WhyChooseUs() {
  return (
    <section
      className="why-section"
      id="why-bookease"
    >

      <div className="why-background-grid"></div>

      <div className="why-glow why-purple-glow"></div>
      <div className="why-glow why-green-glow"></div>

      <div className="container">

        {/* =====================================
            HEADER
           ===================================== */}

        <div className="why-heading">

          <span className="section-eyebrow">
            WHY BOOKEASE
          </span>

          <h2>
            Built around
            <span> your time.</span>
          </h2>

          <p>
            Less waiting. Less confusion. More control
            over every appointment you make.
          </p>

        </div>


        {/* =====================================
            MAIN FEATURE AREA
           ===================================== */}

        <div className="why-layout">

          {/* LEFT FEATURES */}

          <div className="why-column">

            {features.slice(0, 2).map((feature) => (

              <FeatureCard
                key={feature.title}
                feature={feature}
              />

            ))}

          </div>


          {/* CENTER PANEL */}

          <div className="why-center">

            <div className="center-orbit orbit-large"></div>
            <div className="center-orbit orbit-small"></div>

            <div className="center-panel">

              <div className="center-logo">
                B
              </div>

              <span className="center-label">
                BOOKEASE
              </span>

              <h3>
                Your time.
                <br />
                <span>Your choice.</span>
              </h3>

              <p>
                A smarter way to discover,
                schedule and manage services.
              </p>


              {/* Mini stats */}

              <div className="center-stats">

                <div>
                  <strong>24/7</strong>
                  <span>ACCESS</span>
                </div>

                <div>
                  <strong>98%</strong>
                  <span>SATISFACTION</span>
                </div>

                <div>
                  <strong>1</strong>
                  <span>PLATFORM</span>
                </div>

              </div>


              <div className="center-status">

                <span></span>

                Everything under control

              </div>

            </div>

          </div>


          {/* RIGHT FEATURES */}

          <div className="why-column">

            {features.slice(2, 4).map((feature) => (

              <FeatureCard
                key={feature.title}
                feature={feature}
              />

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}


/* =========================================
   FEATURE CARD
   ========================================= */

function FeatureCard({ feature }) {

  return (
    <div
      className={`why-feature-card ${feature.accent}`}
    >

      <div className="feature-icon">
        {feature.icon}
      </div>

      <div className="feature-content">

        <h3>
          {feature.title}
        </h3>

        <p>
          {feature.description}
        </p>

      </div>

      <span className="feature-arrow">
        ↗
      </span>

    </div>
  );
}


export default WhyChooseUs;