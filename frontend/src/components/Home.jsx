import DestinationSearch from "./homepage/DestinationSearch";
import NavBar from './NavBar';
import Features from './homepage/Features';
import DestinationCarousel from './homepage/DestinationCarousel';
import Footer from './Footer'; // Ensure the path is correct


const Home = () => {

  return (
    <div>
      <NavBar />
      <DestinationSearch />
      <Features />
      <DestinationCarousel />
      <Footer />
    </div>
  );
};

export default Home;
