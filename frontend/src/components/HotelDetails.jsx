import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import LoadingIcon from "./LoadingIcon";

const HotelDetails = () => {
  const { id } = useParams();
  const hotelID = id;
  const location = useLocation();
  const navigate = useNavigate();
  const { destinationId, startDate, endDate, guests, rooms, enhancedHotels } =
    location.state || {};
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/hotels/${id}/price`,
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
          setRoomDetails(response.data);
          setLoading(false);
        } else {
          setTimeout(fetchHotelDetails, 2000); // Retry after 2 seconds
        }
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id, destinationId, startDate, endDate, guests, rooms]);

  const handleSelectRoom = (roomId, roomPrice, roomDescription) => {
    navigate(`/book/${roomId}`, {
      state: {
        hotelID,
        destinationId,
        startDate,
        endDate,
        roomPrice,
        roomDescription,
      },
    });
  };

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">{enhancedHotels.name}</h2>
      <div className="mb-4">
        <Map lat={enhancedHotels.latitude} lng={enhancedHotels.longitude} />
      </div>
      <div className="mb-4">
        <p>{enhancedHotels.description}</p>
        <p>Address: {enhancedHotels.address}</p>
        <p>Star Rating: {enhancedHotels.rating}</p>
        <p>Guest Rating: {enhancedHotels.trustyou?.score?.overall ?? "N/A"}</p>
      </div>
      <h3 className="text-xl mb-2">Available Rooms</h3>
      <div className="grid grid-cols-1 gap-4">
        {roomDetails.rooms.map((room) => (
          <div key={room.key} className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold">{room.roomDescription}</h4>
            <p>{room.long_description}</p>
            <div className="flex space-x-4">
              {room.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt="Room"
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
            <p>Price: {room.price}</p>
            <p>Free Cancellation: {room.free_cancellation ? "Yes" : "No"}</p>
            <p>Amenities:</p>
            <ul>
              {room.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
            <button
              onClick={() =>
                handleSelectRoom(room.key, room.price, room.roomDescription)
              }
              className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
