import { useState } from "react";
import PropTypes from "prop-types";

const HotelFilter = ({ onFilterChange }) => {
  const [starRatings, setStarRatings] = useState([]);
  const [minGuestRating, setMinGuestRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleFilterChange = () => {
    onFilterChange({
      starRatings,
      minGuestRating,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl mb-2">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700">Star Ratings</label>
          <select
            multiple
            value={starRatings}
            onChange={(e) =>
              setStarRatings(
                [...e.target.selectedOptions].map((option) => option.value)
              )
            }
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Guest Rating</label>
          <input
            type="number"
            value={minGuestRating}
            onChange={(e) => setMinGuestRating(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="mt-3">to</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleFilterChange}
        className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Apply Filters
      </button>
    </div>
  );
};

HotelFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default HotelFilter;
