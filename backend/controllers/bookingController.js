import { Booking } from "../models/bookingModel.js";
import { addUserBooking } from "../controllers/userController.js";

export const newBooking = async (req, res) => {
  const newBooking = {
    email: req.body.email,
    roomID: req.body.roomID,
    destinationID: req.body.destinationID,
    hotelID: req.body.hotelID,
    numberOfNights: req.body.numberOfNights,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    adults: req.body.adults,
    children: req.body.children,
    messageToHotel: req.body.messageToHotel,
    roomType: req.body.roomType,
    price: req.body.price,
    salutation: req.body.salutation,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    stripePaymentID: req.body.stripePaymentID,
    billingAddressOne: req.body.billingAddressOne,
    billingAddressTwo: req.body.billingAddressTwo,
    billingAddressPostalCode: req.body.billingAddressPostalCode,
  };

  const booking = await Booking.create(newBooking);
  return booking._id.toHexString();
};

export const createBooking = async (req, res) => {
  try {
    const body = req.body;
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
      if (!body[field]) {
        return res
          .status(400)
          .send({ message: `Missing required field: ${field}` });
      }
    }
    const newBookingId = await newBooking({ body });
    const userData = { booking_id: newBookingId, email: body.email };
    await addUserBooking(userData);
    return res.status(200).send({ message: "Both Booking and User updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

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
