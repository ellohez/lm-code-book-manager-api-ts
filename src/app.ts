import express from "express";
import { router, routeInformation } from "./routes/routes";
import { baseUrl } from "./routes/routes";
import { errorObject } from "./controllers/types";

export const app = express();

app.use(express.json());
app.use(baseUrl, router);
app.use((req, res, next) => {
	res.status(404).json({
		status: 404,
		message: "Oops! That's embarrasing!",
		details: `${req.url} was not found`,
		suggestions: "See following list of valid endpoints",
		routes: routeInformation
	} as errorObject);
});