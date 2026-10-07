import "./ServiceCard.css";

function ServiceCard({
  icon,
  category,
  name,
  description,
  price,
  duration,
  available,
  featured,
}) {
  return (
    <article className={`service-card ${featured ? "featured" : ""}`}>

      {featured && (
        <div className="featured-badge">
          Most Popular
        </div>
      )}

      {/* Top */}
      <div className="service-card-top">

        <div className="service-icon">
          {icon}
        </div>

        <span className="service-category">
          {category}
        </span>

      </div>


      {/* Content */}
      <div className="service-card-content">

        <h3>
          {name}
        </h3>

        <p>
          {description}
        </p>

      </div>


      {/* Meta */}
      <div className="service-meta">

        <div className="service-price">

          <span>
            Starting from
          </span>

          <strong>
            ₹{price}
          </strong>

        </div>


        <div className="service-duration">

          <span className="duration-icon">
            ◷
          </span>

          {duration} min

        </div>

      </div>


      {/* Bottom */}
      <div className="service-card-bottom">

        <div className="availability">

          <span
            className={`availability-dot ${
              available ? "available" : "unavailable"
            }`}
          ></span>

          {available
            ? "Available today"
            : "Currently unavailable"}

        </div>


        <button className="service-book-button">

          Book Now

          <span>
            →
          </span>

        </button>

      </div>

    </article>
  );
}

export default ServiceCard;