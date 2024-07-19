import express from "express";
import {
  newBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getListOfBookings,
} from "../controllers/bookingController.js";
import { addUserBooking } from "../controllers/userController.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newBookingId = await newBooking({ body });
    const userData = { booking_id: newBookingId, email: body.email };
    console.log(userData);
    await addUserBooking(userData);
    console.log("functions completed");
    return res.status(200).send("Both Booking and User updated");
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
});

router.get("/", getAllBookings);
router.get("/ids", getListOfBookings);
router.get("/:id", getBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
