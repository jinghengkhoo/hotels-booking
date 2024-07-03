import { useState, useEffect } from "react";
import axios from "axios";
import HotelList from "./HotelList";
import LoadingIcon from "./LoadingIcon";
import { useLocation } from "react-router-dom";

const HotelSearch = () => {
  const { state } = useLocation();
  const { destinationId, startDate, endDate, guests, rooms } = state;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        console.log("sent")
        const response = await axios.get(
          "http://localhost:5555/api/hotels/prices",
          {
            params: {
              destination_id: destinationId,
              checkin: startDate,
              checkout: endDate,
              lang: "en_US",
              currency: "SGD",
              country_code: "SG",
              guests: Array(rooms).fill(guests).join("|"),
              partner_id: 1,
            },
          }
        );

        if (response.data.completed) {
          setHotels(response.data.hotels);
          setLoading(false);
        } else {
          setTimeout(fetchHotels, 500); // Retry after 0.5 seconds
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, [destinationId, startDate, endDate, guests, rooms]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {loading ? (
        <LoadingIcon />
      ) : (
        <HotelList
          hotels={hotels}
          destinationId={destinationId}
          startDate={startDate}
          endDate={endDate}
          guests={guests}
          rooms={rooms}
        />
      )}
    </div>
  );
};

export default HotelSearch;
