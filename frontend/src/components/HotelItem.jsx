import PropTypes from "prop-types";

const HotelItem = ({ hotel, onSelect }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{hotel.name}</h3>
      {hotel.price !== undefined && <p>Price: {hotel.price}</p>}
      {hotel.rating !== undefined && <p>Star Rating: {hotel.rating}</p>}
      {hotel.trustyou && hotel.trustyou.score && hotel.trustyou.score.overall !== undefined && (
        <p>Guest Rating: {hotel.trustyou.score.overall}</p>
      )}
      <button
        onClick={() => onSelect(hotel.id)}
        className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Select
      </button>
    </div>
  );
};

HotelItem.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    rating: PropTypes.number,
    trustyou: PropTypes.shape({
      score: PropTypes.shape({
        overall: PropTypes.number,
      }),
    }),
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default HotelItem;
