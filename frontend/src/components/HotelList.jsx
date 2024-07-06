import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HotelFilter from "./HotelFilter";
import HotelItem from "./HotelItem";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIcon from "./LoadingIcon";
import NavBar from "./NavBar";

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
      // setDisplayedHotels(initialHotels);
      setDisplayedHotels(mockHotels); // this is for testing
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

  const handleSelectHotel = (hotelId) => {
    navigate(`/hotels/${hotelId}`, {
      state: {
        destinationId,
        startDate,
        endDate,
        guests,
        rooms,
        enhancedHotels,
      },
    });
    console.log("hotelid: ", hotelId);
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
                  <p style={{ textAlign: "center", padding: "20px"}}>
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



// this is here for testing
const mockHotels = [
  {
    "id": "050G",
    "name": "The Forest by Wangz",
    "address": "145A Moulmein Road",
    "price": 434,
    "rating": 4,
    "trustyou": {
      "id": "dede9a48-2f7c-49ae-9bd0-942a40e245e7",
      "score": {
        "overall": "81.0",
        "kaligo_overall": 4.1,
        "solo": "77.0",
        "couple": "81.0",
        "family": "82.0",
        "business": "72.0"
      }
    },
    "image_details": {
      "suffix": ".jpg",
      "count": 52,
      "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/050G/"
    },
    "default_image_index": 1
  },
  {
    "id": "diH7",
    "price": 34,
    "name": "The Fullerton Hotel Singapore",
    "address": "1 Fullerton Square",
    "rating": 5,
    "trustyou": {
      "id": "8e3920e5-46c6-4a1c-b21d-bc67463c2186",
      "score": {
        "overall": 95,
        "kaligo_overall": 4.8,
        "solo": 92,
        "couple": 93,
        "family": 93,
        "business": 90
      }
    },
    "image_details": {
      "suffix": ".jpg",
      "count": 56,
      "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/"
    },
    "default_image_index": 1,
  },
  {
    "id": "0KmN",
    "price": 31,
    "name": "Backpackers' Inn Chinatown",
    "address": "27 Mosque Street Chinatown",
    "rating": 2,
    "distance": 11546.6871249398,
    "trustyou": {
      "id": "81e0104c-74db-44d2-9568-5cc8627cc4b2",
      "score": {
        "overall": "74.0",
        "kaligo_overall": 3.7,
        "solo": null,
        "couple": null,
        "family": null,
        "business": null
      }
    },
    "image_details": {
      "suffix": ".jpg",
      "count": 52,
      "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/0KmN/"
    },
    "default_image_index": 1,
  },
  {
    "id": "0pdB",
    "price": 1032,
    "name": "PARKROYAL Serviced Suites Singapore",
    "address": "7500A Beach Road The Plaza #01-345/346",
    "rating": 4,
    "trustyou": {
      "id": "631df070-5c71-4134-87a5-e8a11a2bdbf2",
      "score": {
        "overall": "90.0",
        "kaligo_overall": 4.5,
        "solo": null,
        "couple": "89.0",
        "family": "87.0",
        "business": "89.0"
      }
    },
    "image_details": {
      "suffix": ".jpg",
      "count": 27,
      "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/0pdB/"
    },
    "default_image_index": 1,
  },
  {
    "id": "0Tki",
    "price": 943,
    "name": "Wangz Hotel",
    "address": "231 Outram Road",
    "rating": 4,
    "distance": 11545.5376770518,
    "trustyou": {
      "id": "a3c42f96-aa7c-43da-b5ce-861166853602",
      "score": {
        "overall": "83.0",
        "kaligo_overall": 4.2,
        "solo": "74.0",
        "couple": "79.0",
        "family": "81.0",
        "business": "78.0"
      }
    },
    "image_details": {
      "suffix": ".jpg",
      "count": 17,
      "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/0Tki/"
    },
    "number_of_images": 40,
    "default_image_index": 1,
  },
  // Add more hotel objects here
];