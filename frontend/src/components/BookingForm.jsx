import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePhoneNumber,
  validatePostalCode,
} from "../utils/validationMethods";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const BookingForm = () => {
  const { id } = useParams();
  const location = useLocation();

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    hotelID,
    destinationId,
    startDate,
    endDate,
    roomPrice,
    roomDescription,
  } = location.state;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    adults: 0,
    children: 0,
    messageToHotel: "",
    salutation: "",
    billingAddressOne: "",
    billingAddressTwo: "",
    billingAddressPostalCode: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/user/profile",
          {
            withCredentials: true,
          }
        );
        const userProfile = response.data;
        setFormData({
          firstName: userProfile.firstName || "",
          lastName: userProfile.lastName || "",
          phoneNumber: userProfile.phoneNumber || "",
          emailAddress: userProfile.email || "",
          messageToHotel: "",
          salutation: userProfile.salutation || "",
          billingAddressOne: userProfile.billingAddressOne || "",
          billingAddressTwo: userProfile.billingAddressTwo || "",
          billingAddressPostalCode: userProfile.billingAddressPostalCode || "",
        });
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateBookingForm = () => {
    if (!formData.firstName) {
      setErrorMsg("Please Enter a First Name");
      return 0;
    } else if (!formData.lastName) {
      setErrorMsg("Please Enter a Last Name");
      return 0;
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrorMsg("Please Enter a Valid Singapore Number");
      return 0;
    } else if (!validateEmail(formData.emailAddress)) {
      setErrorMsg("Please Enter a Valid Email Address");
      return 0;
    } else if (!(formData.adults > 0)) {
      setErrorMsg("Booking requires at least 1 Adult");
      return 0;
    } else if (!formData.billingAddressOne) {
      setErrorMsg("Please Enter Billing Address");
      return 0;
    } else if (!validatePostalCode(formData.billingAddressPostalCode)) {
      setErrorMsg("Please Enter a Valid Postal Code");
      return 0;
    }
    return 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      adults,
      children,
      messageToHotel,
      salutation,
      billingAddressOne,
      billingAddressTwo,
      billingAddressPostalCode,
    } = formData;
    setErrorMsg("");

    // Stripe payment processing
    const cardElement = elements.getElement(CardElement);

    if (!validateBookingForm()) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: `${firstName} ${lastName}`,
        email: emailAddress,
        phone: phoneNumber,
        address: {
          line1: billingAddressOne,
          line2: billingAddressTwo,
          postal_code: billingAddressPostalCode,
        },
      },
    });

    if (error) {
      console.error(error);
      setErrorMsg(error.message);
      return;
    }

    const paymentData = {
      amount: Math.floor(roomPrice * 100), // Convert to cents
      currency: "sgd",
      payment_method: paymentMethod.id,
    };

    const { data: paymentIntent } = await axios.post(
      "http://localhost:5555/api/payment",
      paymentData
    );

    const confirmPayment = await stripe.confirmCardPayment(
      paymentIntent.client_secret
    );

    if (confirmPayment.error) {
      return;
    }
    const bookingData = {
      email: emailAddress,
      roomID: id,
      destinationID: destinationId,
      hotelID: hotelID,
      numberOfNights: Math.floor(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      ),
      startDate,
      endDate,
      adults,
      children,
      messageToHotel,
      roomType: roomDescription,
      price: Math.floor(roomPrice * 100) / 100,
      salutation,
      firstName,
      lastName,
      phoneNumber,
      stripePaymentID: paymentIntent.id,
      billingAddressOne,
      billingAddressTwo,
      billingAddressPostalCode,
    };

    await axios.post("http://localhost:5555/api/bookings", bookingData);
    alert("Booking successful!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Phone Number (+65) </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Email Address</label>
        <input
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Adults</label>
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
        <label className="block text-gray-700">Children</label>
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
      <div>
        <label className="block text-gray-700">Special Requests to Hotel</label>
        <textarea
          name="messageToHotel"
          value={formData.messageToHotel}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">Salutation</label>
        <input
          type="text"
          name="salutation"
          value={formData.salutation}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">Billing Address Line 1</label>
        <input
          type="text"
          name="billingAddressOne"
          value={formData.billingAddressOne}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Billing Address Line 2</label>
        <input
          type="text"
          name="billingAddressTwo"
          value={formData.billingAddressTwo}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">
          Billing Address Postal Code
        </label>
        <input
          type="number"
          name="billingAddressPostalCode"
          value={formData.billingAddressPostalCode}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          min="0"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Credit Card Information</label>
        <CardElement className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div>
        {errorMsg && <div className="mb-4 text-red-600">{errorMsg}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Submit Booking
        </button>
      </div>
    </form>
  );
};

const BookingFormWrapper = () => (
  <Elements stripe={stripePromise}>
    <BookingForm />
  </Elements>
);

export default BookingFormWrapper;