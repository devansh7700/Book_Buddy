import { Request, Response } from 'express';
import * as bookService from '../services/bookServices';

export const getAllBooks = (req: Request, res: Response) => {
  const books = bookService.getAllBooks();
  res.status(200).json(books);
};

export const getBookById = (req: Request, res: Response) => {
  const book = bookService.getBookById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(book);
};

export const createBook = (req: Request, res: Response) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const newBook = bookService.createBook({ title, author });
  res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const updatedBook = bookService.updateBook(id, { title, author });
  if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(updatedBook);
};

export const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = bookService.deleteBook(id);
  if (!deleted) return res.status(404).json({ message: 'Book not found' });
  res.status(204).send();
};
