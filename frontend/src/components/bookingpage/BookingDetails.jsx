import React from "react";
import PropTypes from "prop-types";

function BookingDetails({ location }) {
  const { startDate, endDate, roomPrice, roomDescription } = location.state;
  const totalNights = Math.floor(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-4 bg-base-100 rounded-md col-span-1">
      <div className="bg-primary text-white py-2 px-4 rounded-t-md">
        <h3 className="text-lg font-bold">Your Booking Details</h3>
      </div>
      <div className="bg-base-100 p-4 rounded-b-md mb-4 border shadow-md">
        <p>
          <strong>Check-in:</strong>{" "}
          {new Date(startDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p>
          <strong>Check-out:</strong>{" "}
          {new Date(endDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p>
          <strong>Total length of stay:</strong> {totalNights} night
          {totalNights > 1 ? "s" : ""}
        </p>
      </div>
      <div className="bg-primary text-white py-2 px-4 rounded-t-md">
        <h3 className="text-lg font-bold">Your Price Summary</h3>
      </div>
      <div className="bg-base-100 p-4 rounded-b-md border shadow-md">
        <p>
          <strong>{roomDescription}</strong>
        </p>
        <p>
          <strong>Price:</strong> ${roomPrice.toFixed(2)}
        </p>
        <p className="text-sm mt-1">Includes taxes and fees</p>
      </div>
    </div>
  );
}

BookingDetails.propTypes = { location: PropTypes.isRequired };

export default BookingDetails;
