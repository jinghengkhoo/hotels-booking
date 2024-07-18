import { CardElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import BookingDetails from "./BookingDetails";

const BookingFormUI = ({
  errorMsg,
  formData,
  handleChange,
  handleSubmit,
  location,
}) => {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-base-100 shadow-md rounded-md grid grid-cols-3 gap-4">
      <form onSubmit={handleSubmit} className="space-y-4 col-span-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-base-content">Salutation</label>
            <input
              type="text"
              name="salutation"
              value={formData.salutation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-base-content">Email Address</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-base-content">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-base-content">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-base-content">Country Code</label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="+65">+65</option>
              <option value="+91">+91</option>
              <option value="+44">+44</option>
            </select>
          </div>
          <div>
            <label className="block text-base-content">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-base-content">Adults</label>
            <input
              type="number"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-base-content">Children</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-base-content">Message to Hotel</label>
          <textarea
            name="messageToHotel"
            value={formData.messageToHotel}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Payment Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-base-content">
                Credit Card Information
              </label>
              <CardElement className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-base-content">
                Billing Address Line 1
              </label>
              <input
                type="text"
                name="billingAddressOne"
                value={formData.billingAddressOne}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-base-content">
                Billing Address Line 2
              </label>
              <input
                type="text"
                name="billingAddressTwo"
                value={formData.billingAddressTwo}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-base-content">
                Billing Address Postal Code
              </label>
              <input
                type="number"
                name="billingAddressPostalCode"
                value={formData.billingAddressPostalCode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-base-content">
            <input type="checkbox" className="mr-2" required />I agree to the
            Cancellation Policy, Terms of Use, and Privacy Policy.
          </label>
          <label className="block text-base-content">
            <input type="checkbox" className="mr-2" required />I have confirmed
            that my guest and payment details are correct.
          </label>
        </div>
        <div>
          {errorMsg && <div className="mb-4 text-red-600">{errorMsg}</div>}
          <button
            type="submit"
            className="w-full btn btn-primary font-semibold rounded-lg shadow-md text-lg"
          >
            Make Booking
          </button>
        </div>
      </form>
      <div className="border-l-2 border-base-200 col-span-1 my-4">
        <BookingDetails location={location} />
      </div>
    </div>
  );
};

BookingFormUI.propTypes = {
  errorMsg: PropTypes.string,
  formData: PropTypes.shape({
    salutation: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    adults: PropTypes.number.isRequired,
    children: PropTypes.number.isRequired,
    messageToHotel: PropTypes.string,
    billingAddressOne: PropTypes.string.isRequired,
    billingAddressTwo: PropTypes.string,
    billingAddressPostalCode: PropTypes.number.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      roomPrice: PropTypes.number.isRequired,
      roomDescription: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookingFormUI;
