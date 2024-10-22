import Joi from 'joi';

export const bookingValidationSchema = Joi.object({
  email: Joi.string().required(),
  roomID: Joi.string().required(),
  destinationID: Joi.string().required(),
  hotelID: Joi.string().required(),
  numberOfNights: Joi.number().integer().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  adults: Joi.number().integer().required(),
  children: Joi.number().integer().required(),
  messageToHotel: Joi.string().allow(''),
  roomType: Joi.string().required(),
  price: Joi.number().required(),
  salutation: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  stripePaymentID: Joi.string().required(),
  billingAddressOne: Joi.string().required(),
  billingAddressTwo: Joi.string().allow(''),
  billingAddressPostalCode: Joi.number().required(),
});

export const updateBookingValidationSchema = Joi.object({
  email: Joi.string().optional(),
  roomID: Joi.string().optional(),
  destinationID: Joi.string().optional(),
  hotelID: Joi.string().optional(),
  numberOfNights: Joi.number().integer().optional(),
  startDate: Joi.string().optional(),
  endDate: Joi.string().optional(),
  adults: Joi.number().integer().optional(),
  children: Joi.number().integer().optional(),
  messageToHotel: Joi.string().allow(''),
  roomType: Joi.string().optional(),
  price: Joi.number().optional(),
  salutation: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phoneNumber: Joi.number().optional(),
  stripePaymentID: Joi.string().optional(),
  billingAddressOne: Joi.string().optional(),
  billingAddressTwo: Joi.string().allow(''),
  billingAddressPostalCode: Joi.number().optional(),
});

export const userValidationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  salutation: Joi.string().allow(''),
  firstName: Joi.string().allow(''),
  lastName: Joi.string().allow(''),
  phoneNumber: Joi.string().allow(''),
  billingAddressOne: Joi.string().allow(''),
  billingAddressTwo: Joi.string().allow(''),
  billingAddressPostalCode: Joi.number(),
});

export const updateUserValidationSchema = Joi.object({
  email: Joi.string().optional(),
  salutation: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  billingAddressOne: Joi.string().optional(),
  billingAddressTwo: Joi.string().optional(),
  billingAddressPostalCode: Joi.string().optional(),
});