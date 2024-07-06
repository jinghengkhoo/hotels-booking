// src/components/hoteldetails/RoomDisplay.jsx
import React, { useState } from 'react';
import RoomItem from './RoomItem';

const RoomDisplay = ({ roomDetails, endDate, onSelectRoom }) => {
  const [visibleRooms, setVisibleRooms] = useState(5);

  const loadMoreRooms = () => {
    setVisibleRooms((prevVisibleRooms) => prevVisibleRooms + 5);
  };

  return (
    <div className="container mx-auto p-4 mt-0">
      {roomDetails.slice(0, visibleRooms).map((room) => (
        <RoomItem key={room.key} room={room} endDate={endDate} onSelectRoom={onSelectRoom} />
      ))}
      {visibleRooms < roomDetails.length && (
        <div className="text-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 mt-4"
            onClick={loadMoreRooms}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomDisplay;
