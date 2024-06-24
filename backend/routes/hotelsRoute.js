import express from "express";
import { prices, getHotel, getRooms } from "../controllers/hotelsController.js";

const router = express.Router()

router.get('/prices', prices);
router.get('/:id', getHotel);
router.get('/:id/price', getRooms);

export default router
