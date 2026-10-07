import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Services.css";

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
  },
];

const categories = [
  "All",
  "Beauty",
  "Healthcare",
  "Wellness",
  "Fitness",
  "Home",
  "Automotive",
  "Professional",
  "Creative",
];

function Services() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        activeCategory === "All" ||
        service.category === activeCategory;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        service.name.toLowerCase().includes(searchText) ||
        service.description.toLowerCase().includes(searchText) ||
        service.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="services-page page-enter">

      <div className="services-page-container">

        {/* =====================================
            HEADER
        ====================================== */}

        <header className="services-page-header">

          <span className="services-page-eyebrow">
            BOOKEASE MARKETPLACE
          </span>

          <h1>
            Explore <span>Services</span>
          </h1>

          <p>
            Find trusted services, compare your options,
            and book the perfect appointment around your time.
          </p>

        </header>

        {/* =====================================
            SEARCH
        ====================================== */}

        <div className="services-search-wrapper">

          <div className="services-search">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

          <div className="services-result-count">
            <strong>
              {filteredServices.length}
            </strong>

            <span>
              {filteredServices.length === 1
                ? " service"
                : " services"}
              {" "}available
            </span>
          </div>

        </div>

        {/* =====================================
            CATEGORIES
        ====================================== */}

        <div className="services-categories">

          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>
          ))}

        </div>

        {/* =====================================
            SERVICE GRID
        ====================================== */}

        {filteredServices.length > 0 ? (
          <div className="services-marketplace-grid">

            {filteredServices.map((service) => (
              <article
                className={`marketplace-card ${
                  service.featured
                    ? "marketplace-card-featured"
                    : ""
                }`}
                key={service.id}
              >

                {service.featured && (
                  <div className="marketplace-featured">
                    Most Popular
                  </div>
                )}

                <div className="marketplace-card-top">

                  <div className="marketplace-icon">
                    {service.icon}
                  </div>

                  <span className="marketplace-category">
                    {service.category}
                  </span>

                </div>

                <div className="marketplace-card-content">

                  <h2>
                    {service.name}
                  </h2>

                  <p>
                    {service.description}
                  </p>

                </div>

                <div className="marketplace-card-meta">

                  <div className="marketplace-price">

                    <span>
                      Starting from
                    </span>

                    <strong>
                      ₹{service.price}
                    </strong>

                  </div>

                  <div className="marketplace-duration">
                    <span>◷</span>
                    {service.duration} min
                  </div>

                </div>

                <div className="marketplace-card-bottom">

                  <div
                    className={
                      service.available
                        ? "marketplace-availability"
                        : "marketplace-availability unavailable"
                    }
                  >
                    <span></span>

                    {service.available
                      ? "Available today"
                      : "Currently unavailable"}
                  </div>

                  <Link
                    to={`/services/${service.id}`}
                    className="marketplace-view-button"
                  >
                    View
                    <span>→</span>
                  </Link>

                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="services-empty-state">

            <div className="empty-state-icon">
              ⌕
            </div>

            <h2>
              No services found
            </h2>

            <p>
              Try a different search term or choose
              another category.
            </p>

            <button
              className="empty-state-button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Reset Search
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Services;