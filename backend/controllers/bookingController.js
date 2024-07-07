import { Booking } from '../models/bookingModel.js'

export const newBooking = async (request, response) => {
  try {
    const newBooking = {
      email: request.body.email,
      roomID: request.body.roomID,
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
      stripePaymentID: request.body.stripePaymentID,
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
    const result = await deleteBookingById(id);

    return response.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
}

export const deleteBookingById = async (id) => {
  try {
    const result = await Booking.findByIdAndDelete(id);

    if (!result) {
      throw new Error('Booking not found');
    }

    return { message: 'Booking deleted successfully' };
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}