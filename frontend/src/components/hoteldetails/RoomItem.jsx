const RoomItem = ({ room, endDate, onSelectRoom }) => {
  const getBreakfastInfo = (info) => {
    if (info === 'hotel_detail_room_only') {
      return 'Room Only';
    } else if (info === 'hotel_detail_breakfast_included') {
      return 'Breakfast Included';
    }
    return '';
  };

  return (
    <div className="card w-full bg-base-100 shadow-lg rounded-lg mb-6">
      <div className="card-body p-6">
        <h2 className="card-title text-orange-600 text-2xl font-semibold mb-4">{room.roomDescription}</h2>
        <div className="flex">
          <div className="flex-none w-1/6">
            <img src={room.images[0].url} alt="Room" className="rounded-xl shadow-md" />
          </div>
          <div className="flex-auto ml-6 flex justify-between items-center">
            <div className="flex-grow">
              <div className="text-lg font-medium mb-1">
                {getBreakfastInfo(room.roomAdditionalInfo.breakfastInfo)}
              </div>
              {room.free_cancellation && (
                <p className="text-sm text-green-600 mb-2">
                  Free cancellation (except for service fee)
                </p>
              )}
              <p className="text-sm text-gray-600">
                Before {new Date(endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right flex flex-col items-end">
              <p className="text-2xl font-bold text-gray-800 mb-1">
                SGD {room.lowest_price.toFixed(2)}
              </p>
              <span className="text-sm text-gray-600 mb-4">per room per night</span>
              <button
                className="btn btn-warning"
                onClick={() => onSelectRoom(room.key, room.lowest_price, room.roomDescription)}
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
