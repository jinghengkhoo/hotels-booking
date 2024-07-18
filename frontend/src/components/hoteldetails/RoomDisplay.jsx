import { useState } from 'react';
import PropTypes from 'prop-types';
import RoomItem from './RoomItem';

const RoomDisplay = ({ roomDetails, endDate, onSelectRoom, currency }) => {
  const [visibleRooms, setVisibleRooms] = useState(5);

  const loadMoreRooms = () => {
    setVisibleRooms((prevVisibleRooms) => prevVisibleRooms + 5);
  };

  return (
    <div className="container mx-auto p-4 mt-0">
      {roomDetails.slice(0, visibleRooms).map((room) => (
        <RoomItem key={room.key} room={room} endDate={endDate} onSelectRoom={onSelectRoom} currency={currency} />
      ))}
      {visibleRooms < roomDetails.length && (
        <div className="text-center">
          <button
            className="btn btn-primary px-6 py-2 rounded-md shadow-md mt-4"
            onClick={loadMoreRooms}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

RoomDisplay.propTypes = {
  roomDetails: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  endDate: PropTypes.string.isRequired,
  onSelectRoom: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired
};

export default RoomDisplay;
