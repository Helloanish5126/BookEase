import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Booking.css";

const services = [
  {
    id: 1,
    backendId: 2,
    icon: "✂",
    category: "Beauty",
    name: "Premium Haircut",
    description:
      "Professional styling with a personalized consultation and premium grooming experience.",
    price: 450,
    duration: 45,
  },
  {
    id: 2,
    backendId: 2,
    icon: "✦",
    category: "Wellness",
    name: "Deep Relaxation Spa",
    description:
      "A calming wellness session designed to help you reset, recharge, and feel your best.",
    price: 800,
    duration: 60,
  },
  {
    id: 3,
    backendId: 2,
    icon: "◇",
    category: "Healthcare",
    name: "Dental Consultation",
    description:
      "Connect with qualified professionals for routine dental consultation and care.",
    price: 600,
    duration: 30,
  },
];

const demoSlots = [
  {
    id: 2,
    startTime: "11:00",
    endTime: "11:45",
    available: true,
  },
  {
    id: 4,
    startTime: "12:00",
    endTime: "12:45",
    available: true,
  },
  {
    id: 5,
    startTime: "13:00",
    endTime: "13:45",
    available: true,
  },
  {
    id: 6,
    startTime: "15:00",
    endTime: "15:45",
    available: true,
  },
  {
    id: 7,
    startTime: "16:00",
    endTime: "16:45",
    available: false,
  },
];

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function formatDisplayDate(date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service =
    services.find(
      (item) => item.id === Number(serviceId)
    ) || services[0];

  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date())
  );

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [slots, setSlots] = useState(demoSlots);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [bookingError, setBookingError] = useState("");

  const [dates, setDates] = useState([]);

  useEffect(() => {
    const generatedDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();

      date.setDate(date.getDate() + i);

      generatedDates.push(date);
    }

    setDates(generatedDates);
  }, []);

  useEffect(() => {
    async function loadSlots() {
      setLoadingSlots(true);
      setBookingError("");

      try {
        const response = await fetch(
          `http://localhost:8080/api/timeslots/service/${service.backendId}/date/${selectedDate}`
        );

        if (!response.ok) {
          throw new Error("Could not load slots");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setSlots(data);
        } else {
          setSlots(demoSlots);
        }
      } catch (error) {
        setSlots(demoSlots);
      } finally {
        setLoadingSlots(false);
      }
    }

    loadSlots();
  }, [selectedDate, service.backendId]);

  const selectedSlotData = useMemo(() => {
    return slots.find(
      (slot) => slot.id === selectedSlot
    );
  }, [slots, selectedSlot]);

  const handleContinue = () => {
    setBookingError("");

    if (!customerName.trim()) {
      setBookingError("Please enter your name.");
      return;
    }

    if (!customerEmail.trim()) {
      setBookingError("Please enter your email.");
      return;
    }

    if (!customerPhone.trim()) {
      setBookingError("Please enter your phone number.");
      return;
    }

    if (!selectedSlotData) {
      setBookingError("Please select an available time slot.");
      return;
    }

    navigate("/booking-confirmation", {
      state: {
        service,
        selectedDate,
        selectedSlot: selectedSlotData,
        customerName,
        customerEmail,
        customerPhone,
      },
    });
  };

  return (
    <div className="booking-page page-enter">

      <div className="booking-container">

        <Link
          to={`/services/${service.id}`}
          className="booking-back"
        >
          ← Back to Service
        </Link>

        <div className="booking-heading">
          <span>BOOKEASE BOOKING</span>

          <h1>
            Book your <span>appointment.</span>
          </h1>

          <p>
            Choose a date, select your preferred time,
            and confirm your appointment in seconds.
          </p>
        </div>

        <div className="booking-layout">

          {/* LEFT SIDE */}

          <section className="booking-main-card">

            <div className="booking-section">

              <div className="booking-section-heading">
                <div className="booking-step-number">
                  01
                </div>

                <div>
                  <h2>Choose a date</h2>

                  <p>
                    Select the day that works best for you.
                  </p>
                </div>
              </div>

              <div className="booking-date-list">

                {dates.map((date) => {
                  const value = formatDate(date);

                  return (
                    <button
                      key={value}
                      className={
                        selectedDate === value
                          ? "booking-date active"
                          : "booking-date"
                      }
                      onClick={() => {
                        setSelectedDate(value);
                        setSelectedSlot(null);
                      }}
                    >
                      <span>
                        {date.toLocaleDateString(
                          "en-IN",
                          { weekday: "short" }
                        )}
                      </span>

                      <strong>
                        {date.getDate()}
                      </strong>

                      <small>
                        {date.toLocaleDateString(
                          "en-IN",
                          { month: "short" }
                        )}
                      </small>
                    </button>
                  );
                })}

              </div>

            </div>

            <div className="booking-divider"></div>

            <div className="booking-section">

              <div className="booking-section-heading">
                <div className="booking-step-number">
                  02
                </div>

                <div>
                  <h2>Select a time</h2>

                  <p>
                    Pick an available slot for your appointment.
                  </p>
                </div>
              </div>

              {loadingSlots ? (
                <div className="booking-loading">
                  <span></span>
                  Loading available slots...
                </div>
              ) : (
                <div className="booking-slots">

                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      disabled={!slot.available}
                      className={
                        selectedSlot === slot.id
                          ? "booking-slot active"
                          : !slot.available
                            ? "booking-slot unavailable"
                            : "booking-slot"
                      }
                      onClick={() =>
                        setSelectedSlot(slot.id)
                      }
                    >
                      <span>
                        {slot.startTime}
                      </span>

                      <small>
                        {slot.endTime}
                      </small>

                      {!slot.available && (
                        <em>
                          Booked
                        </em>
                      )}
                    </button>
                  ))}

                </div>
              )}

            </div>

            <div className="booking-divider"></div>

            <div className="booking-section">

              <div className="booking-section-heading">
                <div className="booking-step-number">
                  03
                </div>

                <div>
                  <h2>Your details</h2>

                  <p>
                    We need these details to manage your appointment.
                  </p>
                </div>
              </div>

              <div className="booking-form">

                <div className="booking-input-group">
                  <label>
                    Full name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(event) =>
                      setCustomerName(event.target.value)
                    }
                  />
                </div>

                <div className="booking-form-row">

                  <div className="booking-input-group">
                    <label>
                      Email address
                    </label>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={customerEmail}
                      onChange={(event) =>
                        setCustomerEmail(event.target.value)
                      }
                    />
                  </div>

                  <div className="booking-input-group">
                    <label>
                      Phone number
                    </label>

                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={customerPhone}
                      onChange={(event) =>
                        setCustomerPhone(event.target.value)
                      }
                    />
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* RIGHT SIDE */}

          <aside className="booking-summary">

            <div className="booking-summary-top">

              <span>
                BOOKING SUMMARY
              </span>

              <div className="booking-summary-live">
                <i></i>
                Live
              </div>

            </div>

            <div className="booking-service-preview">

              <div className="booking-service-icon">
                {service.icon}
              </div>

              <div>
                <small>
                  {service.category}
                </small>

                <h2>
                  {service.name}
                </h2>
              </div>

            </div>

            <div className="booking-summary-divider"></div>

            <div className="booking-summary-row">

              <span>
                Date
              </span>

              <strong>
                {formatDisplayDate(
                  new Date(`${selectedDate}T00:00:00`)
                )}
              </strong>

            </div>

            <div className="booking-summary-row">

              <span>
                Time
              </span>

              <strong>
                {selectedSlotData
                  ? `${selectedSlotData.startTime} – ${selectedSlotData.endTime}`
                  : "Select a time"}
              </strong>

            </div>

            <div className="booking-summary-row">

              <span>
                Duration
              </span>

              <strong>
                {service.duration} minutes
              </strong>

            </div>

            <div className="booking-summary-divider"></div>

            <div className="booking-total">

              <span>
                Total
              </span>

              <strong>
                ₹{service.price}
              </strong>

            </div>

            {bookingError && (
              <div className="booking-error">
                {bookingError}
              </div>
            )}

            <button
              className="booking-continue"
              onClick={handleContinue}
            >
              Continue to Confirmation
              <span>→</span>
            </button>

            <p className="booking-secure">
              Your booking information is securely handled.
            </p>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default Booking;