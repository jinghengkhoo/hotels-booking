import express from "express";
import { newBooking, getAllBookings, getBooking, updateBooking, deleteBooking } from "../controllers/bookingController.js";

const router = express.Router()

router.post('/', newBooking);
router.get('/', getAllBookings);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;