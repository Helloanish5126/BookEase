
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bookease-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img
              src="/bookease-logo.png"
              alt="BookEase logo"
              className="footer-brand-logo"
            />
            <span className="footer-brand-name">
              Book<span>Ease</span>
            </span>
          </Link>

          <p>
            Smart appointments. Zero waiting.
            <br />
            One simple platform for your time.
          </p>

          <div className="footer-status">
            <span className="footer-status-dot"></span>
            Platform operational
          </div>
        </div>

        <div className="footer-column">
          <h3>Platform</h3>
          <Link to="/services">Services</Link>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#about">About BookEase</a>
          <a href="/#contact">Contact</a>
        </div>

        <div className="footer-column">
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/appointments">My Appointments</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <a href="/#contact">Help Center</a>
          <a href="/#privacy">Privacy Policy</a>
          <a href="/#terms">Terms of Service</a>
          <a href="/#security">Security</a>
        </div>

        <div className="footer-column footer-social">
          <h3>Stay connected</h3>
          <p>
            Follow BookEase for product updates,
            <br />
            features, and platform news.
          </p>

          <div className="footer-social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">IN</a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">X</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BookEase. All rights reserved.</p>

        <div className="footer-legal-links">
          <a href="/#privacy">Privacy</a>
          <span>·</span>
          <a href="/#terms">Terms</a>
          <span>·</span>
          <a href="/#security">Security</a>
        </div>

        <p className="footer-tagline">
          Designed for better time management.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
