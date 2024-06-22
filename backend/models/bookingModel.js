import mongoose from "mongoose"

const bookingSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    destinationID: {
      type: String,
      required: true,
    },
    hotelID: {
      type: String,
      required: true,
    },
    numberOfNights: {
      type: Number,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    adults: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    messageToHotel: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salutation: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    stripeCustomerID: {
      type: String,
      required: true,
    },
    billingAddressOne: {
      type: String,
      required: true,
    },
    billingAddressTwo: {
      type: String,
      required: true,
    },
    billingAddressPostalCode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model('Booking', bookingSchema);