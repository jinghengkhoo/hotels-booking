import { Booking } from '../models/bookingModel.js'

export const newBooking = async (request, response) => {
  try {
    if (
      !request.body.email ||
      !request.body.destinationID ||
      !request.body.hotelID ||
      !request.body.numberOfNights ||
      !request.body.startDate ||
      !request.body.endDate ||
      !request.body.adults ||
      !request.body.children ||
      !request.body.messageToHotel ||
      !request.body.roomType ||
      !request.body.price ||
      !request.body.salutation ||
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.phoneNumber ||
      !request.body.stripeCustomerID ||
      !request.body.billingAddressOne ||
      !request.body.billingAddressTwo ||
      !request.body.billingAddressPostalCode
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      })
    }
    const newBooking = {
      email: request.body.email,
      destinationID: request.body.destinationID,
      hotelID: request.body.hotelID,
      numberOfNights: request.body.numberOfNights,
      startDate: request.body.startDate,
      endDate: request.body.endDate,
      adults: request.body.adults,
      children: request.body.children,
      messageToHotel: request.body.messageToHotel,
      roomType: request.body.roomType,
      price: request.body.price,
      salutation: request.body.salutation,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phoneNumber: request.body.phoneNumber,
      stripeCustomerID: request.body.stripeCustomerID,
      billingAddressOne: request.body.billingAddressOne,
      billingAddressTwo: request.body.billingAddressTwo,
      billingAddressPostalCode: request.body.billingAddressPostalCode,
    };

    const booking = await Booking.create(newBooking);


    return response.status(200).send(booking);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
}

export const getAllBookings = async (request, response) => {
  try {
    const bookings = await Booking.find({});
    return response.status(200).json({
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
}

export const getBooking = async (request, response) => {
  try {

    const { id } = request.params;

    const booking = await Booking.findById(id);

    return response.status(200).json(booking);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
}

export const updateBooking = async (request, response) => {
  try {

    if (
      !request.body.email ||
      !request.body.destinationID ||
      !request.body.hotelID ||
      !request.body.numberOfNights ||
      !request.body.startDate ||
      !request.body.endDate ||
      !request.body.adults ||
      !request.body.children ||
      !request.body.messageToHotel ||
      !request.body.roomType ||
      !request.body.price ||
      !request.body.salutation ||
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.phoneNumber ||
      !request.body.stripeCustomerID ||
      !request.body.billingAddressOne ||
      !request.body.billingAddressTwo ||
      !request.body.billingAddressPostalCode
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      })
    }

    const { id } = request.params;

    const result = await Booking.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Booking not found' })
    }

    return response.status(200).send({ message: 'Booking updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
}

export const deleteBooking = async (request, response) => {
  try {

    const { id } = request.params;

    const result = await Booking.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Booking not found' })
    }

    return response.status(200).send({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
}
