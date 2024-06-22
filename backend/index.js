import express, { request } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { mongoDBURL } from "./config.js";
import booksRoute from './routes/bookingRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(400).send("Hi")
});

app.use('/bookings', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connection to MongoDB successful")
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })