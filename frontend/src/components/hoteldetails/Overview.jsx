import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

const Overview = ({ hotelDetails }) => {
  return (
    <div className="container mx-auto p-4 bg-base-100">
      {/* Navigation Tabs */}
      <div className="flex justify-between items-center border-b-2 mb-4">
        <div className="flex justify-between flex-grow space-x-4">
          <button className="flex-grow text-center border-b-2 border-primary text-primary py-2">Overview</button>
          <button className="flex-grow text-center border-b-2 border-transparent hover:border-base-300 py-2">Info & Prices</button>
          <button className="flex-grow text-center border-b-2 border-transparent hover:border-base-300 py-2">Facilities</button>
          <button className="flex-grow text-center border-b-2 border-transparent hover:border-base-300 py-2">Reviews</button>
        </div>
      </div>

      {/* Hotel Title, Address, and See Rates Button */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">{hotelDetails.name}</h1>
          <p className="text-base-content">
            <FontAwesomeIcon icon={faLocationPin} className="h-4 w-3 inline-block mr-1 text-primary" />
            {hotelDetails.address}
          </p>
        </div>
        <button className="bg-primary text-primary-content px-6 py-2 rounded-md shadow-md hover:bg-accent hover:text-accent-content">See Rates</button>
      </div>
    </div>
  );
};

Overview.propTypes = {
  hotelDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default Overview;