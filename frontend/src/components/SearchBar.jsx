import React, { useState, useEffect } from "react";
import CustomDatePicker from "./CustomDatePicker";
import { useCombobox } from "downshift";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SearchBar = ({ currency, renderDatePicker = true }) => {
  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Get today's date and one week later
  const today = new Date();
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(today.getDate() + 7);

  const [destination, setDestination] = useState(
    localStorage.getItem("destination") || "Singapore"
  );
  const [destinationId, setDestinationId] = useState(
    localStorage.getItem("destinationId") || ""
  );
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(
    localStorage.getItem("startDate") || formatDate(today)
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("endDate") || formatDate(oneWeekLater)
  );
  const [guests, setGuests] = useState(
    parseInt(localStorage.getItem("guests")) || 1
  );
  const [rooms, setRooms] = useState(
    parseInt(localStorage.getItem("rooms")) || 1
  );
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [selectedDest, setSelectedDest] = useState(0);

  useEffect(() => {
    if (destination.length > 0) {
      axios
        .get(`http://localhost:5555/api/destinations?query=${destination}`)
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      setSuggestions([]);
    }
  }, [destination]);

  const validateForm = () => {
    if (!destinationId) {
      console.log("dest error");
      setError("Please select a valid destination.");
      return 0;
    } else if (!startDate) {
      console.log("date error");

      setError("Please select a start date.");
      return 0;
    } else if (!endDate) {
      console.log("date error");

      setError("Please select an end date.");
      return 0;
    } else if (new Date(startDate) > new Date(endDate)) {
      console.log("date error");

      setError("Please select an end date after the selected start date.");
      return 0;
    } else if (guests <= 0) {
      console.log("guest error");

      setError("Please select the number of guests.");
      return 0;
    } else if (rooms <= 0) {
      console.log("room error");

      setError("Please select the number of rooms.");
      return 0;
    }
    return 1;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("success");
      localStorage.setItem("destination", destination);
      localStorage.setItem("destinationId", destinationId);
      localStorage.setItem("startDate", startDate);
      localStorage.setItem("endDate", endDate);
      localStorage.setItem("guests", guests);
      localStorage.setItem("rooms", rooms);
      navigate("/hotels", {
        state: { destinationId, startDate, endDate, guests, rooms, currency },
      });
    }
  };

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange: ({ inputValue }) => {
      setDestination(inputValue);
      if (selectedDest) {
        setDestinationId("");
        setSelectedDest(0);
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      setDestination(selectedItem ? selectedItem.term : "");
      setDestinationId(selectedItem ? selectedItem.uid : "");
      setSelectedDest(1);
    },
    items: suggestions,
    itemToString: (item) => (item ? item.term : ""),
  });

  return (
    <div>
      <div className="flex justify-center items-center py-8 font-montserrat">
        <form
          className="bg-base-100 p-4 rounded-lg shadow-md flex space-x-16 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col">
            <label
              id="destination"
              className="text-gray-700 mt-4 ml-4 font-bold"
            >
              Location
            </label>
            <div className="flex items-center rounded-md p-1 pt-0">
              <input
                placeholder="where to next?"
                className="w-full px-3 py-2 bg-base-100 mt-2 border-none focus:outline-none"
                {...getInputProps()}
                type="text"
                name="destination"
                id="destination"
                data-testid="destination"
                value={destination}
              />
            </div>
            <ul
              className={`absolute w-56 bg-base-100 shadow-md max-h-80 overflow-scroll p-0 z-10 mt-28 ${
                !(isOpen && suggestions.length) && "hidden"
              }`}
              {...getMenuProps()}
            >
              {isOpen &&
                suggestions.map((item, index) => (
                  <li
                    key={item.id}
                    {...getItemProps({ item, index })}
                    className={`cursor-pointer px-4 py-2 ${
                      highlightedIndex === index
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {item.term}
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <label id="startDate" className="text-gray-700 mt-4 font-bold">
              Date Start
            </label>
            <div className="bg-base-100 flex items-center mt-2 py-1">
              {renderDatePicker ? (
                <CustomDatePicker
                  className="bg-base-100 flex items-center py-1"
                  minDate={startDate}
                  maxDate={endDate}
                  selectedDate={startDate}
                  onChange={setStartDate}
                />
              ) : (
                <input
                  type="text"
                  className="form-input bg-base-100 flex items-center py-1"
                  placeholder="YYYY-MM-DD"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  data-testid="startDate"
                  pattern="\d{4}-\d{2}-\d{2}"
                  required
                />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label id="endDate" className="text-gray-700 mt-4 font-bold">
              Date End
            </label>
            <div className="bg-base-100 flex items-center mt-2 py-1">
              {renderDatePicker ? (
                <CustomDatePicker
                  className="bg-base-100 flex items-center py-1"
                  minDate={startDate}
                  selectedDate={endDate}
                  onChange={setEndDate}
                />
              ) : (
                <input
                  type="text"
                  className="form-input bg-base-100 flex items-center py-1"
                  placeholder="YYYY-MM-DD"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  data-testid="endDate"
                  pattern="\d{4}-\d{2}-\d{2}"
                  required
                />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label id="guests" className="text-gray-700 mt-4 font-bold">
              Number of Travelers
            </label>
            <div className="flex items-center rounded-md mt-2">
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                data-testid="guests"
                className="w-full py-2 bg-base-100 focus:outline-none"
              >
                {[...Array(25).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label id="rooms" className="text-gray-700 mt-4 font-bold">
              Number of Rooms
            </label>
            <div className="flex mt-2 items-center rounded-md">
              <select
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                data-testid="rooms"
                className="w-full py-2 bg-base-100 focus:outline-none"
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "Room" : "Rooms"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-accent text-white px-8 py-4 mt-6 rounded-md shadow-md hover:bg-accent"
              data-testid="submit-button"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        {error && (
          <div className="mb-4 text-lg font-montserrat text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  currency: PropTypes.string.isRequired,
};

export default SearchBar;
