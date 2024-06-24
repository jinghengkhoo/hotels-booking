import express from "express";
import { getDestinations } from "../controllers/destinationsController.js";

const router = express.Router()

router.get('', getDestinations);

export default router
