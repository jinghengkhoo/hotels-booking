import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import CustomDatePicker from './DatePicker'; // Ensure you have this component or import a date picker library

const SearchBar = () => {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [guests, setGuests] = useState(1);
    const [rooms, setRooms] = useState(1);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="flex justify-center items-center py-8">
            <form className="bg-white p-4 rounded-lg shadow-md flex space-x-4" onSubmit={handleFormSubmit}>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
                    <input
                        placeholder="Destination"
                        className="w-full px-3 py-2 bg-white border-none focus:outline-none"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        type="text"
                        name="destination"
                    />
                </div>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-2" />
                    <CustomDatePicker selectedDate={startDate} onChange={setStartDate} />
                </div>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-2" />
                    <CustomDatePicker selectedDate={endDate} onChange={setEndDate} />
                </div>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <FontAwesomeIcon icon={faUsers} className="text-gray-500 mr-2" />
                    <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-none focus:outline-none"
                    >
                        {[...Array(10).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <FontAwesomeIcon icon={faUsers} className="text-gray-500 mr-2" />
                    <select
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-none focus:outline-none"
                    >
                        {[...Array(10).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1} {i + 1 === 1 ? "Room" : "Rooms"}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
