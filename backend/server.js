import app from "./app.js"
import mongoose from "mongoose";

const PORT = process.env.PORT;

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


