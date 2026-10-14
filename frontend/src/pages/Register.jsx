import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || ""
).replace(/\/+$/, "");

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !name.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!API_BASE_URL) {
      setError(
        "Server configuration is missing. Please try again later."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
            password,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Registration failed. This email may already be registered."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to BookEase. Please try again later."
          : err.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-enter register-page">
      <div className="register-card">
        <p className="register-eyebrow">JOIN BOOKEASE</p>

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Create your account to book and manage appointments.
        </p>

        <form
          className="register-form"
          onSubmit={handleRegister}
        >
          <label htmlFor="register-name">Full Name</label>

          <input
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />

          <label htmlFor="register-email">Email Address</label>

          <input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="register-phone">Phone Number</label>

          <input
            id="register-phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            autoComplete="tel"
            required
          />

          <label htmlFor="register-password">Password</label>

          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />

          {error && (
            <p
              className="register-message register-error"
              role="alert"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              className="register-message register-success"
              role="status"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="register-login-link">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;