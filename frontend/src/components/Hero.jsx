import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-background-glow hero-glow-left"></div>
      <div className="hero-background-glow hero-glow-right"></div>

      <div className="hero-grid"></div>

      <div className="container hero-container">

        {/* ================================
            LEFT CONTENT
        ================================= */}

        <div className="hero-content">

          <div className="hero-badge">
            <span className="hero-badge-dot"></span>

            SMART BOOKING PLATFORM

            <span className="hero-badge-arrow">
              ↗
            </span>
          </div>

          <h1 className="hero-title">
            Smart
            <br />

            <span>appointments.</span>

            <br />

            <span className="hero-gradient-text">
              Zero waiting.
            </span>
          </h1>

          <p className="hero-description">
            Discover services, choose your preferred time,
            and manage every appointment from one powerful
            booking experience.
          </p>

          {/* ================================
              HERO ACTIONS
          ================================= */}

          <div className="hero-actions">

            <Link
              to="/services"
              className="hero-primary-button"
            >
              Book an Appointment

              <span>
                →
              </span>
            </Link>

            <Link
              to="/services"
              className="hero-secondary-button"
            >
              Explore Services

              <span>
                ↗
              </span>
            </Link>

          </div>

          {/* ================================
              TRUST SECTION
          ================================= */}

          <div className="hero-trust">

            <div className="hero-trust-avatars">

              <div className="hero-avatar avatar-one">
                A
              </div>

              <div className="hero-avatar avatar-two">
                S
              </div>

              <div className="hero-avatar avatar-three">
                R
              </div>

              <div className="hero-avatar avatar-four">
                K
              </div>

            </div>

            <div className="hero-trust-text">

              <div className="hero-stars">
                ★★★★★
              </div>

              <span>
                Trusted by 2,500+ users
              </span>

            </div>

          </div>

        </div>

        {/* ================================
            RIGHT BOOKING VISUAL
        ================================= */}

        <div className="hero-visual">

          <div className="hero-orbit hero-orbit-one"></div>

          <div className="hero-orbit hero-orbit-two"></div>

          <div className="hero-orbit hero-orbit-three"></div>

          {/* Decorative dots */}

          <span className="hero-floating-dot hero-dot-one"></span>
          <span className="hero-floating-dot hero-dot-two"></span>
          <span className="hero-floating-dot hero-dot-three"></span>

          {/* ================================
              MAIN BOOKING CARD
          ================================= */}

          <div className="booking-preview-card">

            <div className="booking-preview-top">

              <div>
                <span className="booking-preview-label">
                  BOOKING EXPERIENCE
                </span>

                <h2>
                  Your time,
                  <span> your way.</span>
                </h2>
              </div>

              <div className="booking-live">
                <span></span>
                Live
              </div>

            </div>

            {/* Calendar */}

            <div className="booking-calendar">

              <div className="calendar-header">

                <strong>
                  October 2026
                </strong>

                <span>
                  →
                </span>

              </div>

              <div className="calendar-days">

                <div>
                  <small>MON</small>
                  <strong>05</strong>
                </div>

                <div>
                  <small>TUE</small>
                  <strong>06</strong>
                </div>

                <div className="calendar-selected">
                  <small>WED</small>
                  <strong>07</strong>
                </div>

                <div>
                  <small>THU</small>
                  <strong>08</strong>
                </div>

                <div>
                  <small>FRI</small>
                  <strong>09</strong>
                </div>

              </div>

            </div>

            {/* Service */}

            <div className="booking-service">

              <div className="booking-service-icon">
                ✦
              </div>

              <div className="booking-service-info">

                <small>
                  NEXT AVAILABLE
                </small>

                <strong>
                  Premium Haircut
                </strong>

                <span>
                  Today · 04:30 PM
                </span>

              </div>

              <div className="booking-available">
                Available
              </div>

            </div>

            {/* Progress */}

            <div className="booking-progress-section">

              <div className="booking-progress-label">
                <span>
                  Booking progress
                </span>

                <strong>
                  75%
                </strong>
              </div>

              <div className="booking-progress">
                <span></span>
              </div>

            </div>

          </div>

          {/* ================================
              FLOATING SLOT CARD
          ================================= */}

          <div className="hero-floating-card hero-slot-card">

            <div className="floating-card-icon">
              ✓
            </div>

            <div className="floating-card-content">

              <strong>
                Slot Available
              </strong>

              <span>
                12:00 PM · Today
              </span>

            </div>

          </div>

          {/* ================================
              FLOATING CONFIRMATION CARD
          ================================= */}

          <div className="hero-floating-card hero-confirmed-card">

            <div className="floating-card-icon confirmed">
              ✓
            </div>

            <div className="floating-card-content">

              <strong>
                Booking Confirmed
              </strong>

              <span>
                Your appointment is reserved
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================================
          HERO STATS
      ================================= */}

      <div className="container hero-stats">

        <div className="hero-stat">
          <strong>2.5K+</strong>
          <span>Bookings</span>
        </div>

        <div className="hero-stat-divider"></div>

        <div className="hero-stat">
          <strong>150+</strong>
          <span>Services</span>
        </div>

        <div className="hero-stat-divider"></div>

        <div className="hero-stat">
          <strong>98%</strong>
          <span>Satisfaction</span>
        </div>

        <div className="hero-stat-divider"></div>

        <div className="hero-stat">
          <strong>24/7</strong>
          <span>Platform</span>
        </div>

      </div>

    </section>
  );
}

export default Hero;