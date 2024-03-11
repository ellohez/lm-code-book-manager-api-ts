import { Request, Response } from "express";
import * as bookService from "../services/books";
import { classToInvokable } from "sequelize/types/utils";

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
		res.status(404).json("Not found");
	}
};

export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;
	try {
		const book = await bookService.saveBook(bookToBeSaved);
		res.status(201).json(book);
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
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

	// TODO: Remove this
	console.log("bookId :>> ", bookId);

	let numRows = 0;
	try {
		numRows = await bookService.deleteBook(bookId);

		// TODO: Remove this
		console.log("numRows :>> ", numRows);

		if (numRows !== 1) {
			res.status(404).json({ message: "Book not found" });
			return;
		}
		res
			.status(200)
			.json({ message: `Book (ID: ${bookId}) successfully deleted` });
	} catch (error) {
		res.status(404).json({ message: (error as Error).message });
	}
};
