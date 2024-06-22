import 'dotenv/config'
import express, { request } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/bookingRoute.js';
import userRoute from './routes/userRoute.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import https from 'https';

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