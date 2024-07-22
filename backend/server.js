import app from "./app.js";
import mongoose from "mongoose";
import http from "http";
import https from "https";
import fs from "fs";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const httpsOptions = {
	key: fs.existsSync("server.key") ? fs.readFileSync("server.key") : null,
	cert: fs.existsSync("server.cert") ? fs.readFileSync("server.cert") : null,
	requestCert: false,
	rejectUnauthorized: false
};

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connection to MongoDB successful");

		if (httpsOptions.key && httpsOptions.cert) {
			https.createServer(httpsOptions, app).listen(PORT, () => {
				console.log(`App is listening on port: ${PORT}`);
			});
		} else {
			http.createServer(app).listen(PORT, () => {
				console.log(`App is listening on port: ${PORT}`);
			});
		}

		http.createServer((req, res) => {
			res.writeHead(301, { "Location": `https://localhost:${PORT}${req.url}` });
			res.end();
		}).listen(80);

	})
	.catch((error) => {
		console.log(error);
	});
