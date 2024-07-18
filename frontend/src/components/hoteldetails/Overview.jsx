import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import PropertyDescription from "./PropertyDescription";

const Overview = ({ hotelDetails, roomDetails }) => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const renderContent = () => {
    switch (selectedTab) {
      case "overview":
        return (
          <div>
            <PropertyDescription hotelDetails={hotelDetails} />
            <ImageCarousel hotelDetails={hotelDetails} />
          </div>
        );
      case "info":
        return <div>Info</div>;
      case "facilities":
        return <div>Facilities</div>;
      case "reviews":
        return <div>Reviews</div>;
      default:
        return <div>Overview</div>;
    }
  };
  return (
    <div className="container mx-auto p-4 mt-16 bg-base-100">
      {/* Navigation Tabs */}
      <div className="flex justify-between items-center border-b-2 border-base-100 mb-4">
        <div className="flex justify-between flex-grow space-x-4">
          <button
            className={`flex-grow text-center py-2 ${
              selectedTab === "overview"
                ? "border-b-2 border-accent"
                : "border-transparent"
            } hover:border-gray-200"`}
            onClick={() => setSelectedTab("overview")}
          >
            Overview
          </button>
          <button
            className={`flex-grow text-center py-2 ${
              selectedTab === "info"
                ? "border-b-2 border-accent"
                : "border-transparent"
            } hover:border-gray-200"`}
            onClick={() => setSelectedTab("info")}
          >
            Info & Prices
          </button>
          <button
            className={`flex-grow text-center py-2 ${
              selectedTab === "facilities"
                ? "border-b-2 border-accent"
                : "border-transparent"
            } hover:border-gray-200"`}
            onClick={() => setSelectedTab("facilities")}
          >
            Facilities
          </button>
          <button
            className={`flex-grow text-center py-2 ${
              selectedTab === "reviews"
                ? "border-b-2 border-accent"
                : "border-transparent"
            } hover:border-gray-200"`}
            onClick={() => setSelectedTab("reviews")}
          >
            Reviews
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="mt-8">
          <h1 className="text-3xl font-bold">{hotelDetails.name}</h1>
          <p className="text-xl mt-4 text-gray-500">
            <FontAwesomeIcon
              icon={faLocationPin}
              className="h-4 w-3 inline-block mr-1 text-accent"
            />
            {hotelDetails.address}
          </p>
        </div>
      </div>
      {/* Tab Content */}
      <div>{renderContent()}</div>
    </div>
  );
};

Overview.propTypes = {
  hotelDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default Overview;
