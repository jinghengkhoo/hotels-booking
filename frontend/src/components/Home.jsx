import DestinationSearch from "./homepage/DestinationSearch";
import Features from "./homepage/Features";
import DestinationCarousel from "./homepage/DestinationCarousel";
import Footer from "./Footer"; // Ensure the path is correct

const Home = () => {
  return (
    <div>
      <DestinationSearch />
      <Features />
      <DestinationCarousel />
      <Footer />
    </div>
  );
};

export default Home;
