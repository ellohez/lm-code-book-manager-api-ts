import { Book } from "../models/book";

export const getBooks = async () => {
	return Book.findAll();
};

export const getBook = async (bookId: number) => {
	return Book.findOne({
		where: { bookId },
	});
};

export const saveBook = async (book: Book) => {
	if(!(await getBook(book.bookId))){
		return Book.create<Book>(book)
	} else {
		return "that ID is all ready in use"
	}
};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (bookId: number, book: Book) => {
	return Book.update(book, {
		where: {
			bookId,
		},
	});
};

export const deleteBook = async (bookId: number) => {
	const book = await getBook(bookId)
	if (book === null){
		return false
	}else{
		book.destroy()
		return book
	}
};
