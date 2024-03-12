import express from "express";
import * as booksController from "../controllers/books_controller";
export const baseUrl = "/api/v1";

export const router = express.Router();
export const routeInformation = [
	`GET ${baseUrl}/books`,
	`GET ${baseUrl}/books/:bookId`,
	`POST ${baseUrl}/books`,
	`PUT ${baseUrl}/books/bookId`,
	`DELETE ${baseUrl}/books/:bookId`
];

router.get("/books", booksController.getBooks);
router.get("/books/:bookId", booksController.getBook);
router.post("/books", booksController.saveBook);
// User Story 4 - Update Book By Id Solution
router.put("/books/:bookId", booksController.updateBook);
// User story - delete Book By Id Solution
router.delete("/books/:bookId", booksController.deleteBook);
