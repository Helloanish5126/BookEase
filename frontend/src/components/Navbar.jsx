import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <nav className="bookease-navbar">

        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-mark">B</span>
          <span className="logo-text">
            Book<span>Ease</span>
          </span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link active">
            Home
          </Link>

          <Link to="/services" className="nav-link">
            Services
          </Link>

          <a href="/#how-it-works" className="nav-link">
            How It Works
          </a>

          <a href="/#about" className="nav-link">
            About
          </a>

          <a href="/#contact" className="nav-link">
            Contact
          </a>
        </div>

        <div className="navbar-actions">
          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-signup">
            Get Started
          </Link>
        </div>

        <button
          className={`mobile-menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-navigation ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/services" onClick={closeMenu}>
          Services
        </Link>

        <a href="/#how-it-works" onClick={closeMenu}>
          How It Works
        </a>

        <a href="/#about" onClick={closeMenu}>
          About
        </a>

        <a href="/#contact" onClick={closeMenu}>
          Contact
        </a>

        <div className="mobile-actions">
          <Link to="/login" className="nav-login" onClick={closeMenu}>
            Login
          </Link>

          <Link to="/register" className="nav-signup" onClick={closeMenu}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;