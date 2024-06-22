import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    bookingIDs: {
      type: [String],
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
    emailAddress: {
      type: String,
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

export const User = mongoose.model('User', userSchema);