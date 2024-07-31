import React, { useState, useEffect } from "react";
import axios from "axios";
import HotelList from "./hotelsearchpage/HotelList";
import LoadingIcon from "./LoadingIcon";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const HotelSearch = () => {
  const sortList = ["Highest Price", "Lowest Price", "Best Ratings", "Lowest Ratings"];

  const { state } = useLocation();
  const { destinationId, startDate, endDate, guests, rooms } = state;
  const [hotels, setHotels] = useState([]);
  const [sortedHotels, setSortedHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortState, setSortState] = useState(sortList[0]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        console.log("sent");
        const response = await axios.get("http://localhost:5555/api/hotels/prices", {
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
        });

        if (response.data.completed) {
          console.log("Hotels fetched successfully:", response.data.hotels);
          setHotels(response.data.hotels);
          setLoading(false);
        } else {
          console.log("Waiting...");
          setTimeout(fetchHotels, 500); // Retry after 0.5 seconds
        }
      } catch (error) {
        setError("Error fetching hotel data");
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destinationId, startDate, endDate, guests, rooms]);

  useEffect(() => {
    const sortHotels = () => {
      console.log("Sorting hotels by:", sortState);
      let sortedArray = [...hotels];
      switch (sortState) {
        case "Highest Price":
          sortedArray.sort((a, b) => b.price - a.price);
          break;
        case "Lowest Price":
          sortedArray.sort((a, b) => a.price - b.price);
          break;
        case "Best Ratings":
          sortedArray.sort((a, b) => b.rating - a.rating);
          break;
        case "Lowest Ratings":
          sortedArray.sort((a, b) => a.rating - b.rating);
          break;
        default:
          sortedArray = hotels;
      }
      setSortedHotels(sortedArray);
    };

    sortHotels();
  }, [sortState, hotels]);

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
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 items-center" data-testid="hotel-list">
        <p className="col-span-1 xl:col-start-2 xl:col-span-2 text-center xl:text-left sm:ml-12 sm:mr-12 lg:ml-0 lg:mr-0">
          All prices displayed here are the grand total, inclusive of taxes & fees
        </p>
        <div className="col-span-1 xl:col-start-4 justify-self-center xl:justify-self-end">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn right-0 z-10 w-50 rounded-full bg-base-100 ring-1 ring-black ring-opacity-5">
              <p>Sort By: {sortState}</p>
            </div>
            <ul tabIndex={0} className="dropdown-content dropdown-right menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><a onClick={() => handleDropDownClick(0)}>{sortList[0]}</a></li>
              <li><a onClick={() => handleDropDownClick(1)}>{sortList[1]}</a></li>
              <li><a onClick={() => handleDropDownClick(2)}>{sortList[2]}</a></li>
              <li><a onClick={() => handleDropDownClick(3)}>{sortList[3]}</a></li>
            </ul>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingIcon />
      ) : error ? (
        <div role="alert">{error}</div>
      ) : (
        <HotelList
          hotels={sortedHotels}
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
