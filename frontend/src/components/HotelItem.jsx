import PropTypes from "prop-types";
import { useState } from "react";

const HotelItem = ({ hotel, onSelect }) => {
  const getImageURL = () => {
    return hotel.image_details.prefix.concat(hotel.default_image_index,hotel.image_details.suffix);
  };

  const DrawStarRating = (rating) => {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star) => {
          return (  
            <span
              style={{color: rating >= star ? 'gold' : 'gray',}}>
              ★{' '}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <div className="card card-compact lg:card-side bg-white rounded-xl shadow-md overflow-hidden">
      <div className="lg:shrink-0">
        <img className="h-48 w-full object-cover lg:h-full lg:w-48" src={getImageURL()}/>
      </div>
      <div className="card-body">
        <h3 className="text-xl font-semibold">{hotel.name}</h3>
        <p className="text-base">{hotel.address}</p>
        <p className="text-base">{DrawStarRating(hotel.rating)}</p>
        <p className="text-base">Guest Rating: {hotel.trustyou.score.overall}</p>
        <p className="text-right font-semibold tracking-wide text-2xl">${hotel.price}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => onSelect(hotel.id)}
            className="btn btn-neutral font-semibold text-l tracking-wide">
            Check availability
          </button>
        </div>
      </div>
    </div>
  );
};

// HotelItem.propTypes = {
//   hotel: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number,
//     rating: PropTypes.number,
//     trustyou: PropTypes.shape({
//       score: PropTypes.shape({
//         overall: PropTypes.number,
//       }),
//     }),
//   }).isRequired,
//   onSelect: PropTypes.func.isRequired,
// };

HotelItem.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    trustyou: PropTypes.shape({
      score: PropTypes.shape({
        overall: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default HotelItem;
