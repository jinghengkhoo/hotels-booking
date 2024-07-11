import "react-datepicker/dist/react-datepicker.css";
import singaporeImage from "../../assets/singapore.jpg";
import SearchBar from "../SearchBar";
import NavBar from "../NavBar";
import React from "react";

const DestinationSearch = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <main
        className="w-full flex flex-col items-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${singaporeImage})`, height: '80vh' }}
      >
        <NavBar textColor="white" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end items-start py-10 px-48">
          <h2 className="text-4xl font-bold text-white mb-4">Singapore, Singapore</h2>
          <p className="text-lg text-white mb-6">Get ready for your next adventure →</p>
        </div>
      </main>
      <div className="relative z-10 w-full max-w-screen-lg mx-auto -mt-16 px-4">
        <SearchBar />
      </div>
    </div>
  );
};

export default DestinationSearch;
