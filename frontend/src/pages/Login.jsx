
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080"
).replace(/\/+$/, "");

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Invalid email or password."
        );
      }

      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
      };

      localStorage.setItem(
        "bookeaseUser",
        JSON.stringify(user)
      );

      window.dispatchEvent(
        new Event("bookease-auth-change")
      );

      setSuccess(`Welcome back, ${data.name}!`);

      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to BookEase. Please check your internet connection or try again later."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page page-enter">
      <section className="login-card">
        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Sign in to manage your BookEase appointments.
        </p>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >
          <div className="login-field">
            <label htmlFor="login-email">
              Email address
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p
              className="login-message login-error"
              role="alert"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              className="login-message login-success"
              role="status"
            >
              {success}
            </p>
          )}

          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
