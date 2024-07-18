import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingIcon from "../LoadingIcon";
import Overview from "../hoteldetails/Overview";
import "../hoteldetails/hoteldetails.css";
import RoomDisplay from "../hoteldetails/RoomDisplay";
import Map from "../Map";
import SearchBar from "../SearchBar";
import NavBar from "../NavBar";

const HotelDetails = () => {
  const { id } = useParams();
  const hotelID = id;
  const location = useLocation();
  const navigate = useNavigate();
  const { destinationId, startDate, endDate, guests, rooms, hotelDetails } =
    location.state || {};
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
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
          setRoomDetails(response.data.rooms);
          setLoading(false);
        } else {
          setTimeout(fetchRoomDetails, 500); // Retry after 0.5 seconds
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
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

  if (loading || loading) {
    return <LoadingIcon />;
  }

  return (
    <div className="font-montserrat">
      <NavBar textColor="black" />
      <SearchBar />
      <Overview hotelDetails={hotelDetails} />
      <div className="mb-4">
        <Map lat={hotelDetails.latitude} lng={hotelDetails.longitude} />
      </div>
      <RoomDisplay
        roomDetails={roomDetails}
        endDate={endDate}
        onSelectRoom={handleSelectRoom}
      />
    </div>
  );
};

export default HotelDetails;
