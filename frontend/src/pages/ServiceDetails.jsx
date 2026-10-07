import { Link, useParams } from "react-router-dom";
import "./ServiceDetails.css";

const services = [
  {
    id: 1,
    icon: "✂",
    category: "Beauty",
    name: "Premium Haircut",
    description:
      "Professional styling with a personalized consultation and premium grooming experience.",
    price: 450,
    duration: 45,
    available: true,
    featured: true,
    features: [
      "Personalized style consultation",
      "Professional haircut and styling",
      "Premium grooming experience",
      "Post-service styling guidance",
    ],
  },
  {
    id: 2,
    icon: "✦",
    category: "Wellness",
    name: "Deep Relaxation Spa",
    description:
      "A calming wellness session designed to help you reset, recharge, and feel your best.",
    price: 800,
    duration: 60,
    available: true,
    features: [
      "Relaxation-focused session",
      "Professional wellness care",
      "Calming environment",
      "Personalized session experience",
    ],
  },
  {
    id: 3,
    icon: "◇",
    category: "Healthcare",
    name: "Dental Consultation",
    description:
      "Connect with qualified professionals for routine dental consultation and care.",
    price: 600,
    duration: 30,
    available: true,
    features: [
      "Initial dental consultation",
      "Professional examination",
      "Basic oral health guidance",
      "Personalized care recommendations",
    ],
  },
  {
    id: 4,
    icon: "◈",
    category: "Fitness",
    name: "Personal Training",
    description:
      "One-on-one fitness guidance tailored around your goals, schedule, and experience.",
    price: 700,
    duration: 60,
    available: true,
    features: [
      "One-on-one trainer session",
      "Goal-based guidance",
      "Personalized workout planning",
      "Progress recommendations",
    ],
  },
  {
    id: 5,
    icon: "◉",
    category: "Healthcare",
    name: "Eye Checkup",
    description:
      "Comprehensive vision screening and professional eye health consultation.",
    price: 500,
    duration: 30,
    available: true,
    features: [
      "Vision screening",
      "Basic eye health assessment",
      "Professional consultation",
      "Personalized recommendations",
    ],
  },
  {
    id: 6,
    icon: "＋",
    category: "Healthcare",
    name: "Physiotherapy",
    description:
      "Personalized physical therapy sessions focused on recovery, mobility, and strength.",
    price: 750,
    duration: 45,
    available: true,
    features: [
      "Movement assessment",
      "Personalized therapy session",
      "Mobility-focused exercises",
      "Recovery recommendations",
    ],
  },
  {
    id: 7,
    icon: "◆",
    category: "Automotive",
    name: "Car Service",
    description:
      "Professional vehicle inspection and maintenance to keep your car performing smoothly.",
    price: 1200,
    duration: 90,
    available: true,
    features: [
      "Vehicle inspection",
      "Maintenance check",
      "Performance assessment",
      "Service recommendations",
    ],
  },
  {
    id: 8,
    icon: "⌂",
    category: "Home",
    name: "Home Cleaning",
    description:
      "Reliable professional cleaning service for a fresh, organized, and comfortable home.",
    price: 900,
    duration: 90,
    available: true,
    features: [
      "Professional cleaning",
      "Room-by-room service",
      "Surface cleaning",
      "Fresh and organized finish",
    ],
  },
  {
    id: 9,
    icon: "§",
    category: "Professional",
    name: "Legal Consultation",
    description:
      "Book a private consultation with a legal professional for guidance on your matter.",
    price: 1500,
    duration: 45,
    available: false,
    features: [
      "Private consultation",
      "Initial case discussion",
      "Professional guidance",
      "Next-step recommendations",
    ],
  },
  {
    id: 10,
    icon: "◌",
    category: "Creative",
    name: "Photography Session",
    description:
      "Professional photography sessions for portraits, events, products, and special moments.",
    price: 2000,
    duration: 60,
    available: true,
    features: [
      "Professional photography",
      "Session planning",
      "Multiple composition options",
      "Professional image guidance",
    ],
  },
  {
    id: 11,
    icon: "◇",
    category: "Beauty",
    name: "Skin Consultation",
    description:
      "Personalized skincare consultation to understand your skin and build a suitable routine.",
    price: 900,
    duration: 45,
    available: true,
    features: [
      "Skin assessment",
      "Personalized consultation",
      "Routine recommendations",
      "Product guidance",
    ],
  },
  {
    id: 12,
    icon: "❄",
    category: "Home",
    name: "AC Service",
    description:
      "Professional air-conditioner inspection, cleaning, maintenance, and servicing.",
    price: 650,
    duration: 60,
    available: true,
    features: [
      "AC inspection",
      "Filter and component cleaning",
      "Performance check",
      "Maintenance recommendations",
    ],
  },
];

function ServiceDetails() {
  const { serviceId } = useParams();

  const service = services.find(
    (item) => item.id === Number(serviceId)
  );

  if (!service) {
    return (
      <div className="service-details-page page-enter">
        <div className="service-not-found">
          <div className="service-not-found-icon">
            ?
          </div>

          <h1>
            Service not found
          </h1>

          <p>
            The service you're looking for doesn't exist.
          </p>

          <Link
            to="/services"
            className="service-back-button"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="service-details-page page-enter">

      <div className="service-details-container">

        <Link
          to="/services"
          className="service-details-back"
        >
          ← Back to Services
        </Link>

        <div className="service-details-layout">

          {/* =================================
              LEFT VISUAL
          ================================== */}

          <div className="service-details-visual">

            <div className="service-details-orbit orbit-one"></div>
            <div className="service-details-orbit orbit-two"></div>

            <div className="service-details-icon">
              {service.icon}
            </div>

            <span className="details-floating-dot dot-one"></span>
            <span className="details-floating-dot dot-two"></span>
            <span className="details-floating-dot dot-three"></span>

          </div>

          {/* =================================
              RIGHT INFORMATION
          ================================== */}

          <div className="service-details-content">

            <div className="service-details-category">
              {service.category}
            </div>

            {service.featured && (
              <div className="service-details-featured">
                Most Popular
              </div>
            )}

            <h1>
              {service.name}
            </h1>

            <p className="service-details-description">
              {service.description}
            </p>

            <div className="service-details-meta">

              <div className="details-meta-item">
                <span>
                  Starting from
                </span>

                <strong>
                  ₹{service.price}
                </strong>
              </div>

              <div className="details-meta-item">
                <span>
                  Duration
                </span>

                <strong>
                  {service.duration} min
                </strong>
              </div>

              <div className="details-meta-item">
                <span>
                  Availability
                </span>

                <strong
                  className={
                    service.available
                      ? "details-available"
                      : "details-unavailable"
                  }
                >
                  {service.available
                    ? "Available"
                    : "Unavailable"}
                </strong>
              </div>

            </div>

            <div className="service-details-divider"></div>

            <div className="service-details-features">

              <h2>
                What's included
              </h2>

              <div className="details-feature-list">

                {service.features.map((feature) => (
                  <div
                    className="details-feature"
                    key={feature}
                  >
                    <span>
                      ✓
                    </span>

                    {feature}
                  </div>
                ))}

              </div>

            </div>

            <div className="service-details-action">

              {service.available ? (
                <Link
                  to={`/booking/${service.id}`}
                  className="service-book-button-large"
                >
                  Book This Service

                  <span>
                    →
                  </span>
                </Link>
              ) : (
                <button
                  className="service-book-button-large disabled"
                  disabled
                >
                  Currently Unavailable
                </button>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ServiceDetails;