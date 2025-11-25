import { Request, Response } from "express";
import * as bookService from "../services/bookServices";
import  sendEmail  from "../../../config/mailer"; 

// GET /books

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    return res.status(200).json(books);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

//GET /books/:id

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /books

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, isBorrowed, borrowedDate, dueDate } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    const newBook = await bookService.createBook({
      title,
      author,
      isBorrowed: isBorrowed ?? false,
      borrowedDate: borrowedDate ?? null,
      dueDate: dueDate ?? null
    });

    return res.status(201).json(newBook);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


// PUT /books/:id

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(updatedBook);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /books/:id
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deleted = await bookService.deleteBook(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /books/:id/late-fee
export const calculateLateFee = async (req: Request, res: Response) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!book.dueDate) {
      return res
        .status(400)
        .json({ message: "This book does not have a due date." });
    }

    const today = new Date();
    const due = new Date(book.dueDate);

    let daysLate = Math.floor(
      (today.getTime() - due.getTime()) / (1000 * 3600 * 24)
    );

    if (daysLate < 0) daysLate = 0;

    const lateFee = daysLate * 1;

    // Update in Firestore
    await bookService.updateBook(book.id, {
      daysLate,
      lateFee,
    });

    // Send email if overdue
    if (daysLate > 0) {
      await sendEmail(
        "student@example.com",
        "Book Overdue Notice",
        `Your book "${book.title}" is overdue by ${daysLate} days. Fee: $${lateFee}`
      );
    }

    return res.status(200).json({
      title: book.title,
      dueDate: book.dueDate,
      daysLate,
      lateFee,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
