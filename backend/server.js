import app from "./app.js"
import mongoose from "mongoose";

import http from "http";
import https from "https";
import fs from "fs";

const PORT = process.env.PORT;

const httpsOptions = {
	key: fs.readFileSync("server.key"),
  	cert: fs.readFileSync("server.cert"),
	requestCert: false,
	rejectUnauthorized: false
};

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connection to MongoDB successful")
		https.createServer(httpsOptions, app).listen(PORT, () => {
			console.log(`App is listening to port: ${PORT}`);
		});
		http.createServer((req, res) => {
			res.writeHead(301, { "Location": `https://localhost:${PORT}${req.url}` });
			res.end();
		}).listen(80);
    })
    .catch((error) => {
        console.log(error)
    })


