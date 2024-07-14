import { useState, useEffect } from "react";
import axios from "axios";
import HotelList from "./hotelsearchpage/HotelList";
import LoadingIcon from "./LoadingIcon";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const HotelSearch = () => {
  const sortList = [
    "Highest Price",
    "Lowest Price",
    "Best Ratings",
    "Lowest Ratings",
  ];

  const { state } = useLocation();
  const { destinationId, startDate, endDate, guests, rooms } = state;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortState, setSortState] = useState(sortList[0]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // console.log("sent")
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

  const handleDropDownClick = (item) => {
    setSortState(sortList[item]);

    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar textColor="black" />
      <SearchBar />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 items-center">
        <p className="col-span-1 xl:col-start-2 xl:col-span-2 text-center xl:text-left sm:ml-12 sm:mr-12 lg:ml-0 lg:mr-0">All prices displayed here are the grand total, inclusive of taxes & fees</p>
        <div className="col-span-1 xl:col-start-4 justify-self-center xl:justify-self-end">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
        <p className="col-span-1 lg:col-start-2 lg:col-span-2 text-center lg:text-left">
          All prices displayed here are the grand total, inclusive of taxes &
          fees
        </p>
        <div className="col-span-1 lg:col-start-4 justify-self-center lg:justify-self-end">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn right-0 z-10 w-50 rounded-full bg-base-100 ring-1 ring-black ring-opacity-5">
            <div
              tabIndex={0}
              role="button"
              className="btn right-0 z-10 w-50 rounded-full bg-white ring-1 ring-black ring-opacity-5"
            >
              <p>Sort By: {sortState}</p>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content dropdown-right menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => handleDropDownClick(0)}>{sortList[0]}</a>
              </li>
              <li>
                <a onClick={() => handleDropDownClick(1)}>{sortList[1]}</a>
              </li>
              <li>
                <a onClick={() => handleDropDownClick(2)}>{sortList[2]}</a>
              </li>
              <li>
                <a onClick={() => handleDropDownClick(3)}>{sortList[3]}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
