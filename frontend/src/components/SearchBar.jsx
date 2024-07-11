import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import CustomDatePicker from "./DatePicker";
import { useCombobox } from "downshift";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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

  const validateForm = () => {
    const newErrors = {};

    if (!destinationId) {
      newErrors.destinationId = "Please select a valid destination.";
    }
    if (!startDate) {
      newErrors.startDate = "Please select a start date.";
    }
    if (!endDate) {
      newErrors.endDate = "Please select an end date.";
    }
    if (guests <= 0) {
      newErrors.guests = "Please select the number of guests.";
    }
    if (rooms <= 0) {
      newErrors.rooms = "Please select the number of rooms.";
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/hotels", {
        state: { destinationId, startDate, endDate, guests, rooms },
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
    },
    onSelectedItemChange: ({ selectedItem }) => {
      setDestination(selectedItem ? selectedItem.term : "");
      setDestinationId(selectedItem ? selectedItem.uid : "");
    },
    items: suggestions,
    itemToString: (item) => (item ? item.term : ""),
  });

  return (
    <div className="flex justify-center items-center py-8 font-montserrat">
      <form className="bg-primary p-4 rounded-lg shadow-md flex space-x-4" onSubmit={handleFormSubmit}>

        {/*Location snippet */}
        <div className="flex flex-col">
          <label htmlFor="destination" className="text-gray-700 mt-4 ml-4 font-bold">Location</label>
          <div className="flex items-center rounded-md p-1 pt-0">
            <input
              placeholder="where to next?"
              className="w-full px-3 py-2 bg-primary border-none focus:outline-none"
              {...getInputProps()}
              type="text"
              name="destination"
              id="destination"
            />
          </div>
          <ul
            className={`absolute w-56 bg-primary shadow-md max-h-80 overflow-scroll p-0 z-10 mt-1 ${!(isOpen && suggestions.length) && 'hidden'}`}
            {...getMenuProps()}
          >
            {isOpen &&
              suggestions.map((item, index) => (
                <li
                  key={item.id}
                  {...getItemProps({ item, index })}
                  className={`cursor-pointer px-4 py-2 ${highlightedIndex === index ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                >
                  {item.term}
                </li>
              ))}
          </ul>
        </div>
        {/*Date snippet */}
        <div className="flex flex-col">
          <label htmlFor="destination" className="text-gray-700 mt-4 font-bold">Date Start</label>
          <div className="flex items-center py-1">
            <CustomDatePicker className="bg-primary" selectedDate={startDate} onChange={setStartDate} />
          </div>
        </div>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="text-gray-500 mr-2"
          />
          <CustomDatePicker selectedDate={endDate} onChange={setEndDate} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="destination" className="text-gray-700 mt-4 font-bold">Number of Travellers</label>
          <div className="flex items-center rounded-md">
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full py-2 bg-primary focus:outline-none"
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="destination" className="text-gray-700 mt-4 font-bold">Number of Rooms</label>
          <div className="flex items-center rounded-md">
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="w-full py-2 bg-primary focus:outline-none"
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? "Room" : "Rooms"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="bg-neutral text-white px-16 m-2 rounded-md shadow-md hover:bg-blue-600">
          Search
        </button>
      </form>
    </div >
  );
};

export default SearchBar;