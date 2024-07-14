import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "../SearchBar";
import NavBar from "../NavBar";
import singaporeImage from "../../assets/main-pics/singapore.jpg";
import kyotoImage from "../../assets/main-pics/kyoto.jpg";
import parisImage from "../../assets/main-pics/paris.jpg";

const destinations = [
  { image: singaporeImage, text: "Singapore, Singapore" },
  { image: kyotoImage, text: "Kyoto, Japan" },
  { image: parisImage, text: "Paris, France" },
];

const DestinationSearch = () => {
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentDestinationIndex((prevIndex) => (prevIndex + 1) % destinations.length);
        setIsTransitioning(false);
      }, 900);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const currentDestination = destinations[currentDestinationIndex];

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <main
        className={`w-full flex flex-col items-center bg-cover bg-center relative main-background ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${currentDestination.image})`, height: '80vh' }}
      >
        <NavBar textColor="white" />
        <div className="absolute inset-0 bg-black bg-opacity-20 py-10 px-48">
          <div className={`absolute bottom-0 left-0 mb-10 ml-48 text-transition ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-4xl font-bold text-white mb-4">{currentDestination.text}</h2>
            <p className="text-lg text-white mb-6">Get ready for your next adventure →</p>
          </div>
        </div>
      </main>
      <div className="relative z-10 w-full max-w-screen-lg mx-auto mt-[-4rem] px-4">
        <SearchBar />
      </div>
    </div>
  );
};

export default DestinationSearch;
