import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useCombobox } from "downshift";
import CustomDatePicker from "./DatePicker";
import singaporeImage from '../assets/singapore.jpg'; // Correct import for the image
import SearchBar from './SearchBar'; // Ensure the path is correct

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${singaporeImage})` }}>
      <div className="mt-64">
        <div className="relative z-10 text-white text-center p-8">
          <h1 className="text-4xl font-bold">Visit the best places in the world with us.</h1>
          <p className="mt-2">Book your hotel with us now.</p>
        </div>
        <div className="relative z-10">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default DestinationSearch;
