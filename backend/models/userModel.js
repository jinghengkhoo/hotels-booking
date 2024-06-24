import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookingIDs: {
      type: [String],
      required: true,
    },
    adults: {
      type: Number,
    },
    children: {
      type: Number,
    },
    salutation: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    stripeCustomerID: {
      type: String,
    },
    billingAddressOne: {
      type: String,
    },
    billingAddressTwo: {
      type: String,
    },
    billingAddressPostalCode: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);