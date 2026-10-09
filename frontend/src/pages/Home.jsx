
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import FinalCTA from "../components/FinalCTA";
import "./Home.css";

function Home() {
  return (
    <div className="bookease-home">
      <div className="bookease-home-background" aria-hidden="true" />

      <div className="bookease-home-content">
        <Hero />
        <ServicesSection />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <FinalCTA />
      </div>
    </div>
  );
}

export default Home;
