import express from "express";
import {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getListOfBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/ids", getListOfBookings);
router.get("/:id", getBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
