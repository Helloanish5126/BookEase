import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import FinalCTA from "../components/FinalCTA";

function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

export default Home;