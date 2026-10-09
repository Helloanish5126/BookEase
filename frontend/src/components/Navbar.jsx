
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem("bookeaseUser");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(getSavedUser);

  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const updateUser = () => setUser(getSavedUser());

    window.addEventListener("bookease-auth-change", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("bookease-auth-change", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  useEffect(() => {
    setUser(getSavedUser());
    closeMenu();
  }, [location.pathname]);

  const isLoggedIn = Boolean(user);

  const scrollToSection = (sectionId) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToSection: sectionId } });
      return;
    }

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const sectionId = location.state?.scrollToSection;

    if (location.pathname === "/" && sectionId) {
      const timer = window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        navigate("/", { replace: true, state: null });
      }, 150);

      return () => window.clearTimeout(timer);
    }
  }, [location.pathname, location.state, navigate]);

  const goHome = () => {
    closeMenu();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const goServices = () => {
    closeMenu();

    if (location.pathname === "/services") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      navigate("/services");
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="bookease-navbar">
        <Link to="/" className="navbar-logo" onClick={goHome}>
          <img
            src="/bookease-logo.png"
            alt="BookEase logo"
            className="navbar-brand-logo"
          />
          <span className="logo-text futuristic-wordmark">
            Book<span>Ease</span>
          </span>
        </Link>

        <div className="navbar-links">
          <button
            type="button"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={goHome}
          >
            Home
          </button>

          <button
            type="button"
            className={`nav-link ${
              location.pathname.startsWith("/services") ? "active" : ""
            }`}
            onClick={goServices}
          >
            Services
          </button>

          <button
            type="button"
            className="nav-link nav-section-button"
            onClick={() => scrollToSection("how-it-works")}
          >
            How It Works
          </button>

          <button
            type="button"
            className="nav-link nav-section-button"
            onClick={() => scrollToSection("about")}
          >
            About
          </button>

          <button
            type="button"
            className="nav-link nav-section-button"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </button>
        </div>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <Link
              to="/profile"
              className="navbar-account-icon"
              aria-label="My Account"
              title="My Account"
            >
              <svg
                viewBox="0 0 24 24"
                width="23"
                height="23"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
              </svg>
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-login">Login</Link>
              <Link to="/register" className="nav-signup">Get Started</Link>
            </>
          )}
        </div>

        <button
          className={`mobile-menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-navigation ${menuOpen ? "show" : ""}`}>
        <button type="button" className="mobile-section-link" onClick={goHome}>
          Home
        </button>

        <button type="button" className="mobile-section-link" onClick={goServices}>
          Services
        </button>

        <button
          type="button"
          className="mobile-section-link"
          onClick={() => scrollToSection("how-it-works")}
        >
          How It Works
        </button>

        <button
          type="button"
          className="mobile-section-link"
          onClick={() => scrollToSection("about")}
        >
          About
        </button>

        <button
          type="button"
          className="mobile-section-link"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </button>

        <div className="mobile-actions">
          {isLoggedIn ? (
            <Link to="/profile" className="nav-login" onClick={closeMenu}>
              My Account
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" className="nav-signup" onClick={closeMenu}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
