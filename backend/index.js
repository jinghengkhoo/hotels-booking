import 'dotenv/config'
import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/bookingRoute.js';
import userRoute from './routes/userRoute.js'
import hotelsRoute from './routes/hotelsRoute.js'
import destinationsRoute from './routes/destinationsRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import adminRoute from './routes/adminRoute.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (request, response) => {
  console.log(request);
  return response.status(400).send("Hi")
});

app.use('/api/bookings', booksRoute);
app.use('/api/user', userRoute);
app.use('/api/destinations', destinationsRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/admin', adminRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection to MongoDB successful")
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error)
  })