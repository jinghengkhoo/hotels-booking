import { useState, useEffect } from "react";
import CustomDatePicker from "./DatePicker";
import { useCombobox } from "downshift";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
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
    <div className="flex justify-center items-center py-8 font-montserrat">
      <form
        className="bg-base-100 p-4 rounded-lg shadow-md flex space-x-16 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col">
          <label id="destination" className="text-gray-700 mt-4 ml-4 font-bold">
            Location
          </label>
          <div className="flex items-center rounded-md p-1 pt-0">
            <input
              placeholder="where to next?"
              className="w-full px-3 py-2 bg-base-100 mt-4 border-none focus:outline-none"
              {...getInputProps()}
              type="text"
              name="destination"
              id="destination"
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
          <div className="bg-base-100 flex items-center mt-4 py-1">
            <CustomDatePicker
              className="bg-base-100 flex items-center py-1"
              minDate={new Date()}
              selectedDate={startDate}
              onChange={setStartDate}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label id="endDate" className="text-gray-700 mt-4 font-bold">
            Date End
          </label>
          <div className="bg-base-100 flex items-center mt-4 py-1">
            <CustomDatePicker
              className="bg-base-100 flex items-center py-1"
              minDate={startDate}
              selectedDate={endDate}
              onChange={setEndDate}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label id="guests" className="text-gray-700 mt-4 font-bold">
            Number of Travelers
          </label>
          <div className="flex items-center rounded-md">
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
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
          <div className="flex items-center rounded-md">
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
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
        <div className="flex flex-col my-2">
          <button
            type="submit"
            className="bg-accent text-white px-8 mx-3 my-5 rounded-md shadow-md hover:bg-accent"
          >
            Search
          </button>
          {error && <div className="mb-4 text-m text-red-600">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
