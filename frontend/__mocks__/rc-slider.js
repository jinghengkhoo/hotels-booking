import React from 'react';

const Slider = ({ onChange, value, min, max, defaultValue }) => {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        aria-label="price-range-slider-min"
      />
      <input
        type="range"
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        aria-label="price-range-slider-max"
      />
    </div>
  );
};

export default Slider;
