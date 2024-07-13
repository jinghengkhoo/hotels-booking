import { useState } from "react";
import PropTypes from "prop-types";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const HotelFilter = ({ onFilterChange }) => {
  const [starRatings, setStarRatings] = useState([]);
  const [minGuestRating, setMinGuestRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const permMinPrice = 0;
  const permMaxPrice = 1000;

  const handleFilterChange = () => {
    console.log(starRatings);
    console.log(minPrice);
    console.log(maxPrice);

    onFilterChange({
      starRatings,
      minGuestRating,
      minPrice,
      maxPrice,
      priceRange
    });

  };

  const resetFilter = () => {
    setStarRatings([]);
    setMinGuestRating(0);
    setMaxPrice(permMaxPrice);
    setMinPrice(permMinPrice);
    setPriceRange([permMinPrice, permMaxPrice]);
  }

  const handleCheckBox = (e) => {
    const { value, checked } = e.target;
    setStarRatings((prev) =>
      checked ? [...prev, value] : prev.filter((rating) => rating !== value)
    );
  };

  const handleSliderChange = sliderValues => {
    setPriceRange(sliderValues);
    setMaxPrice(sliderValues[1]);
    setMinPrice(sliderValues[0]);
  };

  return (
    <div className="card">
      <div className="justify-start card-body card-bordered bg-base-100 rounded-xl shadow-lg">
        <h3 className="text-xl mb-2 font-bold text-base-content">Filters</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-base-content">Star Rating</label>
            <div className="form-control grid grid-flow-row-dense 2x1:grid-cols-1 gap-4 p-4 md:grid-cols-5 xl:grid-cols-1 lg:grid-cols-5 sm:grid-cols-1">
              {Array.from({ length: 5 }, (_, i) => (
                <label className="flex cursor-pointer" key={i}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    value={5 - i}
                    checked={starRatings.includes((5 - i).toString())}
                    onChange={handleCheckBox}
                  />
                  <p className="flex-none ml-5 mr-5">{5 - i} stars</p>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-base-content">Guest Rating</label>
            <input
              type="number"
              value={minGuestRating}
              onChange={(e) => setMinGuestRating(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <label className="block mt-4 text-base-content">Price Range:</label>
            <Slider
              range
              min={permMinPrice}
              max={permMaxPrice}
              defaultValue={priceRange}
              value={priceRange}
              onChange={handleSliderChange}
              className="mt-2"
            />
            <div className="flex justify-between mt-2">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>

        </div>

        <button
          onClick={handleFilterChange}
          className="btn btn-primary rounded-xl">
          Apply Filters
        </button>

        <button
          onClick={resetFilter}
          className="btn btn-secondary rounded-xl">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

HotelFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default HotelFilter;