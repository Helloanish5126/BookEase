

import { useEffect, useMemo, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import "./Booking.css";



const API_BASE_URL = "https://bookease-production-377d.up.railway.app";



const services = [
  {
    id: 1,
    backendId: 2,
    icon: "✂",
    category: "Beauty",
    name: "Premium Haircut",
    description: "Professional styling with a personalized consultation.",
    price: 450,
    duration: 45,
  },
  {
    id: 2,
    backendId: 3,
    icon: "✦",
    category: "Wellness",
    name: "Deep Relaxation Spa",
    description: "A calming wellness session to help you recharge.",
    price: 800,
    duration: 60,
  },
  {
    id: 3,
    backendId: 4,
    icon: "◇",
    category: "Healthcare",
    name: "Dental Consultation",
    description: "Professional dental consultation and care.",
    price: 600,
    duration: 30,
  },
  {
    id: 4,
    backendId: 5,
    icon: "◇",
    category: "Fitness",
    name: "Personal Training",
    description:
      "One-on-one fitness guidance tailored around your goals, schedule, and experience.",
    price: 700,
    duration: 60,
  },
  {
    id: 5,
    backendId: 6,
    icon: "◉",
    category: "Healthcare",
    name: "Eye Checkup",
    description:
      "Comprehensive vision screening and professional eye health consultation.",
    price: 500,
    duration: 30,
  },
  {
    id: 6,
    backendId: 7,
    icon: "+",
    category: "Healthcare",
    name: "Physiotherapy",
    description:
      "Personalized physical therapy sessions focused on recovery, mobility, and strength.",
    price: 750,
    duration: 45,
  },
  {
    id: 7,
    backendId: 8,
    icon: "◆",
    category: "Automotive",
    name: "Car Service",
    description:
      "Professional vehicle inspection and maintenance to keep your car performing smoothly.",
    price: 1200,
    duration: 90,
  },
  {
    id: 8,
    backendId: 9,
    icon: "⌂",
    category: "Home",
    name: "Home Cleaning",
    description:
      "Reliable professional cleaning service for a fresh, organized, and comfortable home.",
    price: 900,
    duration: 90,
  },
  {
    id: 9,
    backendId: 10,
    icon: "§",
    category: "Professional",
    name: "Legal Consultation",
    description:
      "Book a private consultation with a legal professional for guidance on your matter.",
    price: 1500,
    duration: 45,
  },
  {
    id: 10,
    backendId: 11,
    icon: "◌",
    category: "Creative",
    name: "Photography Session",
    description:
      "Professional photography sessions for portraits, events, products, and special moments.",
    price: 2000,
    duration: 60,
  },
  {
    id: 11,
    backendId: 12,
    icon: "◇",
    category: "Beauty",
    name: "Skin Consultation",
    description:
      "Personalized skincare consultation to understand your skin and build a suitable routine.",
    price: 900,
    duration: 45,
  },
  {
    id: 12,
    backendId: 13,
    icon: "❄",
    category: "Home",
    name: "AC Service",
    description:
      "Professional air-conditioner inspection, cleaning, maintenance, and servicing.",
    price: 650,
    duration: 60,
  },
];



function formatDate(date) {

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");



  return `${year}-${month}-${day}`;

}



function formatDisplayDate(dateString) {

  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {

    weekday: "short",

    day: "numeric",

    month: "short",

    year: "numeric",

  });

}



function Booking() {

  const { serviceId } = useParams();

  const navigate = useNavigate();



  const service = services.find(

    (item) => item.id === Number(serviceId)

  );



  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const [selectedSlot, setSelectedSlot] = useState(null);



  const [customerName, setCustomerName] = useState("");

  const [customerEmail, setCustomerEmail] = useState("");

  const [customerPhone, setCustomerPhone] = useState("");



  const [slots, setSlots] = useState([]);

  const [loadingSlots, setLoadingSlots] = useState(false);

  const [bookingLoading, setBookingLoading] = useState(false);

  const [bookingError, setBookingError] = useState("");

  const [dates, setDates] = useState([]);



  useEffect(() => {

    try {

      const user = JSON.parse(

        localStorage.getItem("bookeaseUser") || "null"

      );



      if (user) {

        setCustomerName(user.name || "");

        setCustomerEmail(user.email || "");

        setCustomerPhone(user.phoneNumber || user.phone || "");

      }

    } catch {

      // The booking form remains usable if saved user data is invalid.

    }

  }, []);



  useEffect(() => {

    const generatedDates = [];



    for (let i = 0; i < 7; i++) {

      const date = new Date();

      date.setHours(0, 0, 0, 0);

      date.setDate(date.getDate() + i);

      generatedDates.push(date);

    }



    setDates(generatedDates);

  }, []);



  useEffect(() => {

    let cancelled = false;



    async function loadSlots() {

      if (!service) {

        setSlots([]);

        setBookingError("Service not found. Please return to Services.");

        return;

      }



      setLoadingSlots(true);

      setBookingError("");

      setSelectedSlot(null);

      setSlots([]);



      try {

        const response = await fetch(

          `${API_BASE_URL}/api/time-slots/available/${service.backendId}/${selectedDate}`

        );



        if (!response.ok) {

          throw new Error("Could not load available time slots.");

        }



        const data = await response.json();



        if (!cancelled) {

          setSlots(

            Array.isArray(data)

              ? data.filter(

                  (slot) =>

                    slot.available === true &&

                    Number(slot.service?.id) === service.backendId

                )

              : []

          );

        }

      } catch (error) {

        if (!cancelled) {

          setSlots([]);

          setBookingError(

            error.message === "Failed to fetch"

              ? "Cannot connect to the backend. Please check your internet connection and backend deployment."

              : error.message

          );

        }

      } finally {

        if (!cancelled) {

          setLoadingSlots(false);

        }

      }

    }



    loadSlots();



    return () => {

      cancelled = true;

    };

  }, [selectedDate, service]);



  const selectedSlotData = useMemo(

    () => slots.find((slot) => slot.id === selectedSlot),

    [slots, selectedSlot]

  );



  async function handleContinue(event) {

    event.preventDefault();

    setBookingError("");



    if (!service) {

      setBookingError("Service not found. Please select a valid service.");

      return;

    }



    let user;



    try {

      user = JSON.parse(localStorage.getItem("bookeaseUser") || "null");

    } catch {

      user = null;

    }



    if (!user?.id) {

      navigate("/login");

      return;

    }



    if (

      !customerName.trim() ||

      !customerEmail.trim() ||

      !customerPhone.trim()

    ) {

      setBookingError("Please fill in your name, email, and phone number.");

      return;

    }



    if (!selectedSlotData?.id) {

      setBookingError("Please select an available time slot.");

      return;

    }



    // Make sure the selected slot belongs to the selected service.

    if (Number(selectedSlotData.service?.id) !== service.backendId) {

      setBookingError(

        "The selected slot does not belong to this service. Please select another slot."

      );

      return;

    }



    setBookingLoading(true);



    try {

      const response = await fetch(`${API_BASE_URL}/api/appointments`, {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          user: { id: user.id },

          service: { id: service.backendId },

          timeSlot: { id: selectedSlotData.id },

          bookingDate: new Date().toISOString().slice(0, 19),

          status: "PENDING",

        }),

      });



      const data = await response.json().catch(() => ({}));



      if (!response.ok) {

        throw new Error(

          data.message ||

            data.error ||

            "The appointment could not be saved. Please try another slot."

        );

      }



      navigate("/booking-confirmation", {

        state: {

          appointment: data,

          service,

          selectedDate,

          selectedSlot: selectedSlotData,

          customerName: customerName.trim(),

          customerEmail: customerEmail.trim(),

          customerPhone: customerPhone.trim(),

        },

      });

    } catch (error) {

      setBookingError(

        error.message === "Failed to fetch"

          ? "Cannot connect to the backend. Please check your internet connection and backend deployment."

          : error.message

      );

    } finally {

      setBookingLoading(false);

    }

  }



  if (!service) {

    return (

      <div className="booking-page page-enter">

        <div className="booking-container">

          <h1>Service not found</h1>

          <p>Please select a valid service from the Services page.</p>

          <Link to="/services" className="booking-back">

            ← Back to Services

          </Link>

        </div>

      </div>

    );

  }



  return (

    <div className="booking-page page-enter">

      <div className="booking-container">

        <Link to={`/services/${service.id}`} className="booking-back">

          ← Back to Service

        </Link>



        <div className="booking-heading">

          <span>BOOKEASE BOOKING</span>

          <h1>

            Book your <span>appointment.</span>

          </h1>

          <p>

            Choose a date, select your preferred time, and confirm your

            appointment.

          </p>

        </div>



        <form className="booking-layout" onSubmit={handleContinue}>

          <section className="booking-main-card">

            <div className="booking-section">

              <div className="booking-section-heading">

                <div className="booking-step-number">01</div>

                <div>

                  <h2>Choose a date</h2>

                  <p>Select the day that works best for you.</p>

                </div>

              </div>



              <div className="booking-date-list">

                {dates.map((date) => {

                  const value = formatDate(date);



                  return (

                    <button

                      type="button"

                      key={value}

                      className={

                        selectedDate === value

                          ? "booking-date active"

                          : "booking-date"

                      }

                      onClick={() => setSelectedDate(value)}

                    >

                      <span>

                        {date.toLocaleDateString("en-IN", {

                          weekday: "short",

                        })}

                      </span>

                      <strong>{date.getDate()}</strong>

                      <small>

                        {date.toLocaleDateString("en-IN", {

                          month: "short",

                        })}

                      </small>

                    </button>

                  );

                })}

              </div>

            </div>



            <div className="booking-divider" />



            <div className="booking-section">

              <div className="booking-section-heading">

                <div className="booking-step-number">02</div>

                <div>

                  <h2>Select a time</h2>

                  <p>Choose a real available slot from the database.</p>

                </div>

              </div>



              {loadingSlots ? (

                <div className="booking-loading">

                  Loading available slots...

                </div>

              ) : slots.length === 0 ? (

                <p>

                  No available slots for this date. Please select another date.

                </p>

              ) : (

                <div className="booking-slots">

                  {slots.map((slot) => (

                    <button

                      type="button"

                      key={slot.id}

                      className={

                        selectedSlot === slot.id

                          ? "booking-slot active"

                          : "booking-slot"

                      }

                      onClick={() => setSelectedSlot(slot.id)}

                    >

                      <span>{String(slot.startTime).slice(0, 5)}</span>

                      <small>{String(slot.endTime).slice(0, 5)}</small>

                    </button>

                  ))}

                </div>

              )}

            </div>



            <div className="booking-divider" />



            <div className="booking-section">

              <div className="booking-section-heading">

                <div className="booking-step-number">03</div>

                <div>

                  <h2>Your details</h2>

                  <p>Confirm your contact information.</p>

                </div>

              </div>



              <div className="booking-form">

                <div className="booking-input-group">

                  <label htmlFor="booking-name">Full name</label>

                  <input

                    id="booking-name"

                    type="text"

                    placeholder="Enter your full name"

                    value={customerName}

                    onChange={(event) => setCustomerName(event.target.value)}

                    required

                  />

                </div>



                <div className="booking-form-row">

                  <div className="booking-input-group">

                    <label htmlFor="booking-email">Email address</label>

                    <input

                      id="booking-email"

                      type="email"

                      placeholder="you@example.com"

                      value={customerEmail}

                      onChange={(event) => setCustomerEmail(event.target.value)}

                      required

                    />

                  </div>



                  <div className="booking-input-group">

                    <label htmlFor="booking-phone">Phone number</label>

                    <input

                      id="booking-phone"

                      type="tel"

                      placeholder="+91 XXXXX XXXXX"

                      value={customerPhone}

                      onChange={(event) => setCustomerPhone(event.target.value)}

                      required

                    />

                  </div>

                </div>

              </div>

            </div>

          </section>



          <aside className="booking-summary">

            <div className="booking-summary-top">

              <span>BOOKING SUMMARY</span>

              <div className="booking-summary-live">

                <i />

                Live

              </div>

            </div>



            <div className="booking-service-preview">

              <div className="booking-service-icon">{service.icon}</div>

              <div>

                <small>{service.category}</small>

                <h2>{service.name}</h2>

              </div>

            </div>



            <div className="booking-summary-divider" />



            <div className="booking-summary-row">

              <span>Date</span>

              <strong>{formatDisplayDate(selectedDate)}</strong>

            </div>



            <div className="booking-summary-row">

              <span>Time</span>

              <strong>

                {selectedSlotData

                  ? `${String(selectedSlotData.startTime).slice(0, 5)} – ${String(selectedSlotData.endTime).slice(0, 5)}`

                  : "Select a time"}

              </strong>

            </div>



            <div className="booking-summary-row">

              <span>Duration</span>

              <strong>{service.duration} minutes</strong>

            </div>



            <div className="booking-summary-divider" />



            <div className="booking-total">

              <span>Total</span>

              <strong>₹{service.price}</strong>

            </div>



            {bookingError && (

              <div className="booking-error" role="alert">

                {bookingError}

              </div>

            )}



            <button

              type="submit"

              className="booking-continue"

              disabled={

                bookingLoading || loadingSlots || !selectedSlotData

              }

            >

              {bookingLoading ? "Saving Booking..." : "Confirm Booking"}

              <span>→</span>

            </button>



            <p className="booking-secure">

              Your appointment is confirmed only after it is saved successfully.

            </p>

          </aside>

        </form>

      </div>

    </div>

  );

}



export default Booking;
