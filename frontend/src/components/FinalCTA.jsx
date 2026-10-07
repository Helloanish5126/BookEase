import "./FinalCTA.css";

function FinalCTA() {
  return (
    <section className="final-cta-section">
      <div className="final-cta-glow final-cta-glow-one"></div>
      <div className="final-cta-glow final-cta-glow-two"></div>

      <div className="final-cta-grid"></div>

      <div className="container">
        <div className="final-cta-card">
          <div className="final-cta-content">
            <span className="final-cta-eyebrow">
              YOUR TIME. YOUR CHOICE.
            </span>

            <h2>
              Ready to take control
              <br />
              <span>of your time?</span>
            </h2>

            <p>
              Skip the waiting, avoid the hassle, and book the services
              you need in just a few clicks.
            </p>

            <div className="final-cta-actions">
              <button className="final-cta-primary">
                Book an Appointment
                <span>→</span>
              </button>

              <button className="final-cta-secondary">
                Explore Services
              </button>
            </div>
          </div>

          <div className="final-cta-visual">
            <div className="cta-orbit cta-orbit-one"></div>
            <div className="cta-orbit cta-orbit-two"></div>
            <div className="cta-orbit cta-orbit-three"></div>

            <div className="cta-center">
              <div className="cta-logo">B</div>
              <span>BOOKEASE</span>
              <small>SMART BOOKING</small>
            </div>

            <div className="cta-floating-card cta-card-top">
              <span className="cta-status-dot"></span>
              <div>
                <strong>Slot Available</strong>
                <small>Today · 4:30 PM</small>
              </div>
            </div>

            <div className="cta-floating-card cta-card-bottom">
              <span className="cta-check">✓</span>
              <div>
                <strong>Booking Confirmed</strong>
                <small>Your time is reserved</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;