import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LoadingIcon from "../LoadingIcon";

const ProfileBookingsTable = (userData) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingIDs = userData.userData.bookingIDs;
        if (bookingIDs.length == 0) {
          throw new Error("BookingIDs is null");
        }
        const bookingDetails = await axios.get(
          "http://localhost:5555/api/bookings/ids",
          { params: { ids: bookingIDs } }
        );
        setBookings(bookingDetails.data.bookingsDetails);
        // console.log(bookingDetails.data.bookingsDetails);
        setLoading(false);
      } catch (error) {
        //console.error("Error fetching booking details", error);
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">
                  Booking ID
                </th>
                <th className="border border-slate-600 rounded-md">Email</th>
                <th className="border border-slate-600 rounded-md">Room ID</th>
                <th className="border border-slate-600 rounded-md">
                  Destination ID
                </th>
                <th className="border border-slate-600 rounded-md">Hotel ID</th>
                <th className="border border-slate-600 rounded-md">
                  Number of Nights
                </th>
                <th className="border border-slate-600 rounded-md">
                  Start Date
                </th>
                <th className="border border-slate-600 rounded-md">End Date</th>
                <th className="border border-slate-600 rounded-md">Adults</th>
                <th className="border border-slate-600 rounded-md">Children</th>
                <th className="border border-slate-600 rounded-md">
                  Message to Hotel
                </th>
                <th className="border border-slate-600 rounded-md">
                  Room Type
                </th>
                <th className="border border-slate-600 rounded-md">Price</th>
                <th className="border border-slate-600 rounded-md">
                  Salutation
                </th>
                <th className="border border-slate-600 rounded-md">
                  First Name
                </th>
                <th className="border border-slate-600 rounded-md">
                  Last Name
                </th>
                <th className="border border-slate-600 rounded-md">
                  Phone Number
                </th>
                <th className="border border-slate-600 rounded-md">
                  Stripe Payment ID
                </th>
                <th className="border border-slate-600 rounded-md">
                  Billing Address One
                </th>
                <th className="border border-slate-600 rounded-md">
                  Billing Address Two
                </th>
                <th className="border border-slate-600 rounded-md">
                  Billing Address Postal Code
                </th>
                <th className="border border-slate-600 rounded-md">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking._id}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.email}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.roomID}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.destinationID}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.hotelID}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.numberOfNights}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.adults}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.children}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.messageToHotel}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.roomType}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    ${booking.price.toFixed(2)}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.salutation}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.firstName}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.lastName}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.phoneNumber}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.stripePaymentID}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.billingAddressOne}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.billingAddressTwo}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {booking.billingAddressPostalCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

ProfileBookingsTable.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      roomID: PropTypes.string.isRequired,
      destinationID: PropTypes.string.isRequired,
      hotelID: PropTypes.string.isRequired,
      numberOfNights: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      adults: PropTypes.number.isRequired,
      children: PropTypes.number.isRequired,
      messageToHotel: PropTypes.string.isRequired,
      roomType: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      salutation: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      phoneNumber: PropTypes.number.isRequired,
      stripePaymentID: PropTypes.string.isRequired,
      billingAddressOne: PropTypes.string.isRequired,
      billingAddressTwo: PropTypes.string.isRequired,
      billingAddressPostalCode: PropTypes.number.isRequired,
    })
  ),
};

export default ProfileBookingsTable;
