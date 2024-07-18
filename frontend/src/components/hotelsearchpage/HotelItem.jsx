import PropTypes from "prop-types";
import "./staricons.css";

const HotelItem = ({ hotel, onSelect }) => {
  const getImageURL = () => {
    if (hotel.hires_image_index == null) {
      return "https://cdn-icons-png.freepik.com/512/11208/11208792.png?ga=GA1.1.457828302.1721268782";
    }
    return hotel.image_details.prefix.concat(
      hotel.default_image_index,
      hotel.image_details.suffix
    );
  };

  const DrawStarRating = () => {
    const fullStar = "★";

    const getStarClass = (star) => {
      if (hotel.rating >= star) {
        return "full";
      } else if (hotel.rating >= star - 0.5) {
        return "half";
      } else {
        return "empty";
      }
    };
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${getStarClass(star)}`}>
            {fullStar}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="card card-compact lg:card-side bg-base-100 rounded-xl shadow-lg overflow-hidden border border-base-200">
      <div className="lg:shrink-0">
        <img
          className="h-48 w-full object-cover lg:h-full lg:w-48"
          src={getImageURL()}
          alt={hotel.name}
        />
      </div>
      <div className="card-body">
        <h3 className="text-xl font-semibold">{hotel.name}</h3>
        <p className="text-base">{hotel.address}</p>
        <div className="text-base">{DrawStarRating()}</div>
        <p className="text-base">
          Guest Rating: {hotel.trustyou.score.overall}
        </p>
        <p className="text-right font-semibold tracking-wide text-2xl">
          ${hotel.price}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={() => onSelect(hotel.id)}
            className="btn btn-primary font-semibold text-l tracking-wide rounded-xl"
          >
            Check availability
          </button>
        </div>
      </div>
    </div>
  );
};

HotelItem.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    trustyou: PropTypes.shape({
      score: PropTypes.shape({
        overall: PropTypes.number,
      }),
    }).isRequired,
    image_details: PropTypes.shape({
      prefix: PropTypes.string.isRequired,
      suffix: PropTypes.string.isRequired,
    }).isRequired,
    default_image_index: PropTypes.number.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default HotelItem;
