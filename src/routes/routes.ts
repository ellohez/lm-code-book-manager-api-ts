import express from "express";
import { Request, Response } from 'express';
import * as booksController from "../controllers/books_controller";

export const router = express.Router();
router.get("/books", booksController.getBooks);
router.get("/books/:bookId", booksController.getBook);
router.post("/books", booksController.saveBook);

// User Story 4 - Update Book By Id Solution
router.put("/books/:bookId", booksController.updateBook);

// Lab 1: task 1 - delete book by id
router.delete("/books/:bookId", booksController.deleteBook);

router.all("*", (req: Request, res: Response) => {
    const routes = router.stack.map(layer => {
        // Check if the layer has a route and a path
        if (layer.route && layer.route.path) {
          return {
            path: layer.route.path,
            methods: Object.keys(layer.route.methods)
          };
        }
      }).filter(item => item !== undefined);
    res.status(404).json({error:{type:"no end point here", valid_endpoints: routes}})
})