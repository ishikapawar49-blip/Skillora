import LocationSelector from "./LocationSelector";
import Hero from "./Hero";
import ByCategories from "./ByCategories";
import PopularServices from "./PopularServices";
import HowWorks from "./HowWorks";
import TopProfessionals from "./TopProfessionals";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";

function Home() {
  return (
    <>
      {/* <LocationSelector /> */}
      <Hero />
      <ByCategories />
      <PopularServices/>
      <HowWorks/>
      <TopProfessionals/>
      <Testimonials/>
      <CTASection/>
    </>
  );
}

export default Home;