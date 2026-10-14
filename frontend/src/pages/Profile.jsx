import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || ""
).replace(/\/+$/, "");

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(
    `${String(value).slice(0, 10)}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "";

  const [hours, minutes] = String(value).split(":");
  const date = new Date();

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function Profile() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setUser(
        JSON.parse(
          localStorage.getItem("bookeaseUser") || "null"
        )
      );
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAppointments() {
      let savedUser;

      try {
        savedUser = JSON.parse(
          localStorage.getItem("bookeaseUser") || "null"
        );
      } catch {
        savedUser = null;
      }

      if (!savedUser?.id) {
        setAppointments([]);
        setError("Please log in to view your appointments.");
        setLoading(false);
        return;
      }

      if (!API_BASE_URL) {
        setAppointments([]);
        setError(
          "Server configuration is missing. Please try again later."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/appointments/user/${savedUser.id}`
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.message ||
              data?.error ||
              "Could not load your appointments."
          );
        }

        if (!cancelled) {
          setAppointments(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message === "Failed to fetch"
              ? "Cannot connect to BookEase. Please try again later."
              : err.message || "Could not load your appointments."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAppointments();

    return () => {
      cancelled = true;
    };
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = appointments.filter((appointment) => {
    if (appointment.status === "CANCELLED") {
      return false;
    }

    const dateValue =
      appointment.timeSlot?.slotDate ||
      appointment.bookingDate;

    if (!dateValue) return true;

    const appointmentDate = new Date(
      `${String(dateValue).slice(0, 10)}T00:00:00`
    );

    return (
      !Number.isNaN(appointmentDate.getTime()) &&
      appointmentDate >= today
    );
  });

  const past = appointments.filter((appointment) => {
    if (appointment.status === "CANCELLED") {
      return true;
    }

    const dateValue =
      appointment.timeSlot?.slotDate ||
      appointment.bookingDate;

    if (!dateValue) return false;

    const appointmentDate = new Date(
      `${String(dateValue).slice(0, 10)}T00:00:00`
    );

    return (
      !Number.isNaN(appointmentDate.getTime()) &&
      appointmentDate < today
    );
  });

  function renderAppointment(appointment) {
    const service = appointment.service || {};
    const slot = appointment.timeSlot || {};

    return (
      <article
        className="order-card"
        key={appointment.id}
      >
        <div className="order-card-top">
          <div>
            <h3>{service.name || "Appointment"}</h3>

            <p className="order-date">
              {formatDate(
                slot.slotDate || appointment.bookingDate
              )}
            </p>
          </div>

          <span
            className={`order-status ${String(
              appointment.status || "PENDING"
            ).toLowerCase()}`}
          >
            {appointment.status || "PENDING"}
          </span>
        </div>

        <div className="order-card-details">
          <p>
            <strong>Time:</strong>{" "}
            {formatTime(slot.startTime) || "Time unavailable"}
            {slot.endTime
              ? ` – ${formatTime(slot.endTime)}`
              : ""}
          </p>

          {service.duration != null && (
            <p>
              <strong>Duration:</strong>{" "}
              {service.duration} minutes
            </p>
          )}

          {service.price != null && (
            <p>
              <strong>Price:</strong> ₹{service.price}
            </p>
          )}

          <p>
            <strong>Booking ID:</strong> #{appointment.id}
          </p>
        </div>
      </article>
    );
  }

  return (
    <div className="container page-enter profile-page">
      <div className="profile-header">
        <p className="profile-eyebrow">YOUR ACCOUNT</p>
        <h1>My Account</h1>
        <p>
          Manage your profile and keep track of your bookings.
        </p>
      </div>

      <section className="profile-card">
        <div className="profile-avatar">
          {(user?.name || "U").charAt(0).toUpperCase()}
        </div>

        <div className="profile-details">
          <h2>{user?.name || "BookEase User"}</h2>
          <p>{user?.email || "Email not available"}</p>
          <p>
            {user?.phoneNumber ||
              user?.phone ||
              "Phone number not available"}
          </p>
        </div>
      </section>

      <section className="orders-section">
        <div>
          <p className="profile-eyebrow">BOOKING HISTORY</p>
          <h2>My Orders</h2>
          <p>Your appointments, all in one place.</p>
        </div>

        {loading ? (
          <div className="orders-placeholder">
            <p>Loading your appointments...</p>
          </div>
        ) : error ? (
          <div className="orders-placeholder">
            <p>{error}</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="orders-placeholder">
            <span className="orders-icon">▤</span>
            <h3>No bookings yet</h3>
            <p>
              Your confirmed appointments will appear here.
            </p>
            <Link
              to="/services"
              className="orders-browse-link"
            >
              Explore Services →
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            <div className="orders-group">
              <div className="orders-group-heading">
                <h3>Upcoming Orders</h3>
                <span>{upcoming.length}</span>
              </div>

              {upcoming.length > 0 ? (
                upcoming.map(renderAppointment)
              ) : (
                <p className="orders-empty-text">
                  No upcoming appointments.
                </p>
              )}
            </div>

            <div className="orders-group">
              <div className="orders-group-heading">
                <h3>Past Orders</h3>
                <span>{past.length}</span>
              </div>

              {past.length > 0 ? (
                past.map(renderAppointment)
              ) : (
                <p className="orders-empty-text">
                  No past appointments.
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;