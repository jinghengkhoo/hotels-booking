import { Booking } from "../models/bookingModel.js";

export const newBooking = async (req, res) => {
  try {
    const requiredFields = [
      "email",
      "roomID",
      "destinationID",
      "hotelID",
      "numberOfNights",
      "startDate",
      "endDate",
      "adults",
      "firstName",
      "lastName",
      "stripePaymentID",
    ];

    for (const field of requiredFields) {
      if (!req[field]) {
        return res
          .status(400)
          .send({ message: `Missing required field: ${field}` });
      }
    }

    const newBooking = {
      email: req.email,
      roomID: req.roomID,
      destinationID: req.destinationID,
      hotelID: req.hotelID,
      numberOfNights: req.numberOfNights,
      startDate: req.startDate,
      endDate: req.endDate,
      adults: req.adults,
      children: req.children,
      messageToHotel: req.messageToHotel,
      roomType: req.roomType,
      price: req.price,
      salutation: req.salutation,
      firstName: req.firstName,
      lastName: req.lastName,
      phoneNumber: req.phoneNumber,
      stripePaymentID: req.stripePaymentID,
      billingAddressOne: req.billingAddressOne,
      billingAddressTwo: req.billingAddressTwo,
      billingAddressPostalCode: req.billingAddressPostalCode,
    };

    const booking = await Booking.create(newBooking);

    console.log("New Booking Entry");
    return booking._id.toHexString();
    // return res.status(200).send(booking);
  } catch (error) {
    console.log(error.message);
    // return res.status(500).send({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    return res.status(200).json({
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getListOfBookings = async (req, res) => {
  try {
    const bookingIDs = req.query.ids;
    const bookingsDetails = [];
    await Promise.all(
      bookingIDs.map(async (id) => {
        const booking = await Booking.findById(id);
        if (booking) {
          bookingsDetails.push(booking);
        }
      })
    );
    return res.status(200).json({ bookingsDetails });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndUpdate(id, req.body);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).send({ message: "Booking updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteBookingById(id);

    if (!result) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const deleteBookingById = async (id) => {
  try {
    const result = await Booking.findByIdAndDelete(id);

    if (!result) {
      return null;
    }

    return { message: "Booking deleted successfully" };
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
