
import { Link, useLocation } from "react-router-dom";
import "./BookingConfirmation.css";

function formatDate(dateString) {
  if (!dateString) return "Date unavailable";

  const date = new Date(`${String(dateString).slice(0, 10)}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(timeString) {
  if (!timeString) return "Time unavailable";

  const [hours, minutes] = String(timeString).split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function BookingConfirmation() {
  const location = useLocation();

  const appointment = location.state?.appointment;
  const service = location.state?.service || appointment?.service;
  const slot = location.state?.selectedSlot || appointment?.timeSlot;

  const appointmentDate =
    slot?.slotDate || location.state?.selectedDate;

  if (!appointment) {
    return (
      <div className="container page-enter confirmation-page">
        <div className="confirmation-card">
          <div className="confirmation-icon">✓</div>
          <p className="confirmation-eyebrow">BOOKEASE</p>
          <h1>Booking Confirmation</h1>
          <p className="confirmation-message">
            Your confirmation details are not available in this session.
            You can check your saved appointment in My Orders.
          </p>
          <div className="confirmation-actions">
            <Link to="/profile" className="confirmation-primary">
              View My Orders
            </Link>
            <Link to="/services" className="confirmation-secondary">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-enter confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>

        <p className="confirmation-eyebrow">BOOKEASE</p>
        <h1>Booking Confirmed!</h1>

        <p className="confirmation-message">
          Your appointment has been saved successfully. Here are your booking
          details.
        </p>

        <div className="confirmation-notice">
          <span>Booking status</span>
          <strong>{appointment.status || "PENDING"}</strong>
        </div>

        <div className="confirmation-details">
          <div className="confirmation-detail-row">
            <span>Service</span>
            <strong>{service?.name || "Appointment"}</strong>
          </div>

          <div className="confirmation-detail-row">
            <span>Date</span>
            <strong>
              {formatDate(appointmentDate || appointment.bookingDate)}
            </strong>
          </div>

          <div className="confirmation-detail-row">
            <span>Time</span>
            <strong>
              {formatTime(slot?.startTime)}
              {slot?.endTime ? ` – ${formatTime(slot.endTime)}` : ""}
            </strong>
          </div>

          {service?.duration != null && (
            <div className="confirmation-detail-row">
              <span>Duration</span>
              <strong>{service.duration} minutes</strong>
            </div>
          )}

          {service?.price != null && (
            <div className="confirmation-detail-row">
              <span>Total</span>
              <strong>₹{service.price}</strong>
            </div>
          )}

          <div className="confirmation-detail-row">
            <span>Booking ID</span>
            <strong>#{appointment.id}</strong>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/profile" className="confirmation-primary">
            View My Orders
          </Link>

          <Link to="/services" className="confirmation-secondary">
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
