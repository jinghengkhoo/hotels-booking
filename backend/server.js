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
				console.log(`App is listening on port ${PORT} (HTTPS)`);
			});

			// Redirect from HTTP on port 80 to HTTPS on port PORT
			http.createServer((req, res) => {
				res.writeHead(301, { "Location": `https://localhost:${PORT}${req.url}` });
				res.end();
			}).listen(80, () => {
				console.log("HTTP server listening on port 80");
			});

			// Redirect from HTTP on port PORT to HTTPS on port PORT is impossible using createServer as 1 port can have up to 1 server

			// Redirect from HTTPS on port 443 to HTTPS on port PORT
			https.createServer(httpsOptions, (req, res) => {
				res.writeHead(301, { "Location": `https://localhost:${PORT}${req.url}` });
				res.end();
			}).listen(443, () => {
				console.log("HTTPS server listening on port 443");
			});
		} else {
			http.createServer(app).listen(PORT, () => {
				console.log(`App is listening on port ${PORT} (HTTP)`);
			});
			// Redirect from HTTP on port 80 to HTTP on port PORT
			http.createServer((req, res) => {
				res.writeHead(301, { "Location": `http://localhost:${PORT}${req.url}` });
				res.end();
			}).listen(80, () => {
				console.log("HTTP server listening on port 80");
			});
		}
	})
	.catch((error) => {
		console.log(error);
	});
