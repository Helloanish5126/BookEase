import { useState } from "react";
import ServiceCard from "./ServiceCard";
import "./ServicesSection.css";

const services = [
  {
    icon: "✂",
    category: "Beauty",
    name: "Premium Haircut",
    description:
      "Professional styling with a personalized consultation and premium grooming experience.",
    price: 450,
    duration: 45,
    available: true,
    featured: true,
  },
  {
    icon: "✦",
    category: "Wellness",
    name: "Deep Relaxation Spa",
    description:
      "A calming wellness session designed to help you reset, recharge, and feel your best.",
    price: 800,
    duration: 60,
    available: true,
  },
  {
    icon: "◇",
    category: "Healthcare",
    name: "Dental Consultation",
    description:
      "Connect with qualified professionals for routine dental consultation and care.",
    price: 600,
    duration: 30,
    available: true,
  },
  {
    icon: "◈",
    category: "Fitness",
    name: "Personal Training",
    description:
      "One-on-one fitness guidance tailored around your goals, schedule, and experience.",
    price: 700,
    duration: 60,
    available: true,
  },
  {
    icon: "◉",
    category: "Healthcare",
    name: "Eye Checkup",
    description:
      "Comprehensive vision screening and professional eye health consultation.",
    price: 500,
    duration: 30,
    available: true,
  },
  {
    icon: "＋",
    category: "Healthcare",
    name: "Physiotherapy",
    description:
      "Personalized physical therapy sessions focused on recovery, mobility, and strength.",
    price: 750,
    duration: 45,
    available: true,
  },
  {
    icon: "◆",
    category: "Automotive",
    name: "Car Service",
    description:
      "Professional vehicle inspection and maintenance to keep your car performing smoothly.",
    price: 1200,
    duration: 90,
    available: true,
  },
  {
    icon: "⌂",
    category: "Home",
    name: "Home Cleaning",
    description:
      "Reliable professional cleaning service for a fresh, organized, and comfortable home.",
    price: 900,
    duration: 90,
    available: true,
  },
  {
    icon: "§",
    category: "Professional",
    name: "Legal Consultation",
    description:
      "Book a private consultation with a legal professional for guidance on your matter.",
    price: 1500,
    duration: 45,
    available: false,
  },
  {
    icon: "◌",
    category: "Creative",
    name: "Photography Session",
    description:
      "Professional photography sessions for portraits, events, products, and special moments.",
    price: 2000,
    duration: 60,
    available: true,
  },
  {
    icon: "◇",
    category: "Beauty",
    name: "Skin Consultation",
    description:
      "Personalized skincare consultation to understand your skin and build a suitable routine.",
    price: 900,
    duration: 45,
    available: true,
  },
  {
    icon: "❄",
    category: "Home",
    name: "AC Service",
    description:
      "Professional air-conditioner inspection, cleaning, maintenance, and servicing.",
    price: 650,
    duration: 60,
    available: true,
  },
];

function ServicesSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll
    ? services
    : services.slice(0, 4);

  const handleViewAll = () => {
    setShowAll((previous) => !previous);

    if (!showAll) {
      setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <section
      className="services-section"
      id="services"
    >
      <div className="container">

        {/* Section Heading */}
        <div className="services-heading">

          <div>
            <span className="section-eyebrow">
              EXPLORE SERVICES
            </span>

            <h2>
              Find what you
              <span> need.</span>
            </h2>
          </div>

          <p>
            From everyday appointments to specialized
            services, BookEase makes scheduling simple,
            fast, and convenient.
          </p>

        </div>


        {/* Result Information */}
        <div className="service-result-bar">

          <span>
            Showing{" "}
            <strong>{visibleServices.length}</strong>{" "}
            of{" "}
            <strong>{services.length}</strong>{" "}
            services
          </span>

          <span className="live-service-status">
            <span></span>
            Live availability
          </span>

        </div>


        {/* Services */}
        <div className="services-grid">

          {visibleServices.map((service) => (
            <ServiceCard
              key={service.name}
              {...service}
            />
          ))}

        </div>


        {/* View All Button */}
        <div className="services-footer">

          <button
            className="view-services-button"
            onClick={handleViewAll}
          >
            {showAll
              ? "Show Less"
              : "View All Services"}

            <span
              className={
                showAll ? "arrow-up" : ""
              }
            >
              →
            </span>

          </button>

        </div>

      </div>
    </section>
  );
}

export default ServicesSection;