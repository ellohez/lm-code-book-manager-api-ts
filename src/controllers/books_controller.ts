import { Request, Response } from "express";
import * as bookService from "../services/books";
import { errorObject } from "./types";

export const getBooks = async (req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.json(books).status(200);
};

export const getBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.getBook(Number(bookId));

	if (book) {
		res.json(book).status(200);
	} else {
		res.status(404).json({
			status: 404,
			message: "Resource not found",
			details: `Book with ID ${bookId} does not exist`,
			suggestions: "Check ID exists and try again",
			path: req.originalUrl
		} as errorObject);
	}
};

export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;
	if (!req.body.bookId) {
		res.status(400).json({
			status: 400,
			message: "No book ID provided",
			path: req.originalUrl
		} as errorObject);
		return;
	}
	const bookId = req.body.bookId;

	const book = await bookService.getBook(Number(bookId));

	if (book?.bookId === bookId) {
		res.status(409).json({
			status: 409,
			message: "ID already exists",
			details: `${bookId} is already in use`,
			suggestions: "Please select a new ID for this book",
			path: req.originalUrl
		} as errorObject);

		return;
	}

	try {
		const book = await bookService.saveBook(bookToBeSaved);
		res.status(201).json(book);
	} catch (error) {
		res.status(400).json({
			message: (error as Error).message
		});
	}
};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (req: Request, res: Response) => {
	const bookUpdateData = req.body;
	const bookId = Number.parseInt(req.params.bookId);

	const book = await bookService.updateBook(bookId, bookUpdateData);

	res.status(204).json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
	const bookId = Number.parseInt(req.params.bookId);

	let numRows = 0;
	try {
		numRows = await bookService.deleteBook(bookId);

		if (numRows !== 1) {
			res.status(404).json({
				status: 404,
				message: "Book not found",
				details: `Book with ID ${bookId} does not exist`,
				suggestions: "Please check ID and try again"
			} as errorObject);
			return;
		}
		res
			.status(200)
			.json({ message: `Book (ID: ${bookId}) successfully deleted` });
	} catch (error) {
		res.status(404).json({ message: (error as Error).message });
	}
};
