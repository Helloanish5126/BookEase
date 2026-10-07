import "./Testimonials.css";

const testimonials = [
  {
    initials: "AR",
    name: "Arjun Rao",
    role: "BookEase User",
    rating: 5,
    text:
      "The booking experience is incredibly smooth. I could find the service I wanted and reserve a slot without wasting time.",
  },
  {
    initials: "SM",
    name: "Sneha Mehta",
    role: "BookEase User",
    rating: 5,
    text:
      "I really like how everything is organized. Seeing the available slots before booking makes the whole process much easier.",
  },
  {
    initials: "VK",
    name: "Vikram Kumar",
    role: "BookEase User",
    rating: 5,
    text:
      "Clean interface, quick booking and easy appointment management. BookEase makes something that is usually annoying feel simple.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section" id="reviews">

      <div className="testimonials-glow"></div>

      <div className="container">

        {/* Heading */}

        <div className="testimonials-heading">

          <span className="section-eyebrow">
            CUSTOMER EXPERIENCES
          </span>

          <h2>
            Simple booking.
            <span> Happy people.</span>
          </h2>

          <p>
            A better appointment experience starts with
            making every step simple.
          </p>

        </div>


        {/* Cards */}

        <div className="testimonials-grid">

          {testimonials.map((testimonial) => (

            <article
              className="testimonial-card"
              key={testimonial.name}
            >

              <div className="testimonial-top">

                <div className="stars">

                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, index) => (
                    <span key={index}>
                      ★
                    </span>
                  ))}

                </div>

                <span className="quote-mark">
                  "
                </span>

              </div>


              <p className="testimonial-text">
                "{testimonial.text}"
              </p>


              <div className="testimonial-user">

                <div className="testimonial-avatar">
                  {testimonial.initials}
                </div>

                <div>

                  <strong>
                    {testimonial.name}
                  </strong>

                  <span>
                    {testimonial.role}
                  </span>

                </div>

              </div>

            </article>

          ))}

        </div>


        {/* Trust bar */}

        <div className="trust-bar">

          <div className="trust-main">

            <div className="trust-icon">
              ✓
            </div>

            <div>

              <strong>
                Trusted booking experience
              </strong>

              <span>
                Designed around speed, clarity and convenience.
              </span>

            </div>

          </div>


          <div className="trust-metrics">

            <div>
              <strong>2.5K+</strong>
              <span>Bookings</span>
            </div>

            <div>
              <strong>150+</strong>
              <span>Services</span>
            </div>

            <div>
              <strong>98%</strong>
              <span>Satisfaction</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Testimonials;