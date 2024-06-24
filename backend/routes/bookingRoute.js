import express from "express";
import { newBooking, getAllBookings, getBooking, updateBooking, deleteBooking } from "../controllers/bookingController.js";

const router = express.Router()
// POST add new booking
router.post('/', newBooking);

// GET all bookings
router.get('/', getAllBookings);

// GET one booking
router.get('/:id', getBooking);

// PUT update book
router.put('/:id', updateBooking);

// delete one booking
router.delete('/:id', deleteBooking);

export default router;