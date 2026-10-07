import "./Footer.css";

function Footer() {
  return (
    <footer className="bookease-footer">
      <div className="footer-top-line"></div>

      <div className="container">
        <div className="footer-main">

          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <span className="footer-logo-mark">B</span>

              <span className="footer-logo-text">
                Book<span>Ease</span>
              </span>
            </a>

            <p>
              Smart appointments. Zero waiting.
              <br />
              One simple platform for your time.
            </p>

            <div className="footer-status">
              <span className="footer-status-dot"></span>
              <span>Platform operational</span>
            </div>
          </div>

          <div className="footer-column">
            <h4>Platform</h4>

            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About BookEase</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Account</h4>

            <a href="#login">Login</a>
            <a href="#register">Create Account</a>
            <a href="#appointments">My Appointments</a>
            <a href="#profile">Profile</a>
          </div>

          <div className="footer-column">
            <h4>Support</h4>

            <a href="#help">Help Center</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
          </div>

          <div className="footer-connect">
            <h4>Stay connected</h4>

            <p>
              Follow BookEase for product updates,
              features, and platform news.
            </p>

            <div className="footer-socials">
              <a href="#instagram" aria-label="Instagram">
                IG
              </a>

              <a href="#linkedin" aria-label="LinkedIn">
                IN
              </a>

              <a href="#twitter" aria-label="Twitter">
                X
              </a>

              <a href="#github" aria-label="GitHub">
                GH
              </a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">

          <div className="footer-copyright">
            © 2026 BookEase. All rights reserved.
          </div>

          <div className="footer-bottom-links">
            <a href="#privacy">Privacy</a>
            <span></span>
            <a href="#terms">Terms</a>
            <span></span>
            <a href="#security">Security</a>
          </div>

          <div className="footer-made">
            Designed for better time management.
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;