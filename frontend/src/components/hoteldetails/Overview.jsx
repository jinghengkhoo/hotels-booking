import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";

const Overview = ({ hotelDetails }) => {
  return (
    <div className="container mx-auto p-4 mt-16">
      {/* Navigation Tabs */}
      <div className="flex justify-between items-center border-b-2 border-gray-200 mb-4">
        <div className="flex justify-between flex-grow space-x-4">
          <button className="flex-grow text-center border-b-2 border-blue-500 text-blue-500 py-2">Overview</button>
          <button className="flex-grow text-center border-b-2 border-transparent hover:border-gray-200 py-2">Info & Prices</button>
          <button className="flex-grow text-center border-b-2 border-transparent hover:border-gray-200 py-2">Facilities</button>
          <button className="flex-grow text-center border-b-2 border-transparent hover:border-gray-200 py-2">Reviews</button>
        </div>
      </div>

      {/* Hotel Title, Address, and See Rates Button */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">{hotelDetails.name}</h1>
          <p className="text-gray-500">
          <FontAwesomeIcon icon={faLocationPin} className="h-4 w-3 inline-block mr-1 text-blue-500" />
            {hotelDetails.address}
          </p>
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600">See Rates</button>
      </div>
      </div>
  );
};

export default Overview;