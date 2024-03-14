import * as dotenv from "dotenv";
dotenv.config();

const result = dotenv.config();

if (result.error) {
	throw result.error;
}

console.log("dotenv result =" + result.parsed);

export const CONFIG = {
	port: process.env.PORT ?? 3000,
	dbName: process.env.DB_NAME ?? "sqlite::memory:",
	dbUserName: process.env.DB_USERNAME ?? "",
	dbPassword: process.env.DB_PASSWORD ?? "",
	dbHost: process.env.DB_HOST ?? "localhost",
	dbDialect: process.env.DB_DIALECT ?? "sqlite",
	dbPort: process.env.DB_PORT ?? ""
} as const;
