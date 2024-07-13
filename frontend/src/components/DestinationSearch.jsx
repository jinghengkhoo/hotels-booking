import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useCombobox } from "downshift";
import CustomDatePicker from "./DatePicker";

const DestinationSearch = () => {
  const [destination, setDestination] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const navigate = useNavigate();

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

  const [error, setError] = useState("");

  const validateForm = () => {
    if (!destinationId) {
      setError("Please select a valid destination.");
      return 0;
    } else if (!startDate) {
      setError("Please select a start date.");
      return 0;
    } else if (!endDate) {
      setError("Please select an end date.");
      return 0;
    }
    // else if (guests <= 0) {
    //   setError("Please select the number of guests.");
    //   return 0;
    // }
    // else if (rooms <= 0) {
    //   setError("Please select the number of rooms.");
    //   return 0;
    // }

    return 1;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/hotels", {
        state: { destinationId, startDate, endDate, guests, rooms },
      });
    }
  };

  const [selectedDest, setSelectedDest] = useState(0);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-2xl mb-6">Search Destination</h2>
        <div className="mb-4">
          <label className="block text-gray-700">
            Destination {/*{destinationId} {destination}*/}
          </label>
          <div className="relative">
            <div className="flex shadow-sm bg-white gap-0.5">
              <input
                placeholder="Type a destination"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...getInputProps()}
                type="text"
                name="destination"
              />
            </div>

            <ul
              className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${!(isOpen && suggestions.length) && "hidden"
                }`}
              {...getMenuProps()}
            >
              {isOpen &&
                suggestions.map((item, index) => (
                  <li
                    key={item.id}
                    {...getItemProps({ item, index })}
                    className={`cursor-pointer px-4 py-2 ${highlightedIndex === index
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                      }`}
                  >
                    {item.term}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Start Date {/*{startDate}*/}
          </label>
          <CustomDatePicker
            minDate={new Date()}
            selectedDate={startDate}
            onChange={setStartDate}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            End Date {/*{endDate}*/}
          </label>
          <CustomDatePicker
            minDate={startDate}
            selectedDate={endDate}
            onChange={setEndDate}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rooms</label>
          <select
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i + 1 === 1 ? "Room" : "Rooms"}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default DestinationSearch;
