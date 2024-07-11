import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HotelFilter from "./HotelFilter";
import HotelItem from "./HotelItem";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIcon from "./LoadingIcon";

const HotelList = ({
  hotels,
  destinationId,
  startDate,
  endDate,
  guests,
  rooms,
}) => {
  const [displayedHotels, setDisplayedHotels] = useState([]);
  const [enhancedHotels, setEnhancedHotels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cache = {};

  useEffect(() => {
    const initialLoad = async () => {
      const initialHotels = await fetchAdditionalData(hotels.slice(0, 10));
      setEnhancedHotels(initialHotels);
      setDisplayedHotels(initialHotels);
      setLoading(false);
    };
    initialLoad();
  }, [hotels]);

  useEffect(() => {
    const pollRoomData = async (hotel) => {
      try {
        await axios.get(`http://localhost:5555/api/hotels/${hotel.id}/price`, {
          params: {
            destination_id: destinationId,
            checkin: startDate,
            checkout: endDate,
            lang: "en_US",
            currency: "SGD",
            country_code: "SG",
            guests: Array(rooms).fill(guests).join("|"),
            partner_id: 1,
          }
        });
      } catch (error) {
        console.error("Failed to update background data:", error);
      }

    };

    displayedHotels.forEach(pollRoomData);
  }, [displayedHotels, destinationId, endDate, startDate, guests, rooms]);

  const fetchAdditionalData = async (hotelList) => {
    const hotelPromises = hotelList.map(async (hotel) => {
      if (cache[hotel.id]) {
        return cache[hotel.id];
      }
      const response = await axios.get(
        `http://localhost:5555/api/hotels/${hotel.id}`
      );
      const hotelData = {
        ...hotel,
        ...response.data,
      };
      cache[hotel.id] = hotelData;
      return hotelData;
    });
    return await Promise.all(hotelPromises);
  };

  const handleFilterChange = async (filters) => {
    const newFilteredHotels = enhancedHotels.filter((hotel) => {
      const starRating = hotel.rating ?? 0;
      const guestRating = hotel.trustyou?.score?.overall ?? 0;
      const meetsStarRating =
        filters.starRatings.length === 0 ||
        filters.starRatings.includes(starRating.toString());
      const meetsGuestRating = guestRating >= filters.minGuestRating;
      const meetsPriceRange =
        hotel.price >= filters.minPrice && hotel.price <= filters.maxPrice;
      return meetsStarRating && meetsGuestRating && meetsPriceRange;
    });
    const initialHotels = await fetchAdditionalData(
      newFilteredHotels.slice(0, 10)
    );
    setDisplayedHotels(initialHotels);
    setHasMore(newFilteredHotels.length > initialHotels.length);
  };

  const fetchMoreData = async () => {
    if (displayedHotels.length >= hotels.length) {
      setHasMore(false);
      return;
    }
    const moreHotels = await fetchAdditionalData(
      hotels.slice(displayedHotels.length, displayedHotels.length + 10)
    );
    setDisplayedHotels([...displayedHotels, ...moreHotels]);
    setHasMore(displayedHotels.length + moreHotels.length < hotels.length);
  };

  const handleSelectHotel = (hotelID) => {
    const selectedHotel = enhancedHotels.find(hotel => hotel.id === hotelID);
    navigate(`/hotels/${hotelID}`, {
      state: {
        destinationId,
        startDate,
        endDate,
        guests,
        rooms,
        hotelDetails: selectedHotel,
      },
    });
  };

  return (
    <div >
      <div className="mb-4 mt-4">
        <div className="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-5 gap-4 pt-4">
          <div className="col-start-1 lg:col-start-2 col-span-1">
            <HotelFilter onFilterChange={handleFilterChange} />
          </div>
          <div className="col-start-1 lg:col-start-3 lg:col-span-2">
            {loading ? (
              <LoadingIcon />
            ) : (
              <InfiniteScroll
                dataLength={displayedHotels.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading more hotels...</h4>}
                endMessage={
                  <p style={{ textAlign: "center", padding: "20px" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <div className="grid grid-cols-1 gap-4">
                  {displayedHotels.map((hotel) => (
                    <HotelItem
                      key={hotel.id}
                      hotel={hotel}
                      onSelect={handleSelectHotel}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

HotelList.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  destinationId: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  guests: PropTypes.number.isRequired,
  rooms: PropTypes.number.isRequired,
};

export default HotelList;