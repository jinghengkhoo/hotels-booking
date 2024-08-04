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
import BookingFormUI from "../bookingpage/BookingFormUI";
import {
  validateEmail,
  validatePhoneNumber,
  validatePostalCode,
} from "../../utils/validationMethods";

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
    currency,
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
    } else if (!validateEmail(formData.emailAddress)) {
      setErrorMsg("Please Enter a Valid Email Address");
      return 0;
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrorMsg("Please Enter a Valid Singapore Number");
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
    let {
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

    if (!salutation) {
      salutation = " ";
    }
    if (!messageToHotel) {
      messageToHotel = " ";
    }
    if (!billingAddressTwo) {
      billingAddressTwo = " ";
    }
    if (!children) {
      children = 0;
    }

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
      currency: currency.toLowerCase(),
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
      console.log(confirmPayment.error);
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
    <div className="min-h-screen bg-base-200 flex items-center">
      <BookingFormUI
        errorMsg={errorMsg}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        location={location}
      />
    </div>
  );
};

const BookingFormWrapper = () => (
  <Elements stripe={stripePromise}>
    <BookingForm />
  </Elements>
);

export default BookingFormWrapper;
