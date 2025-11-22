import { db } from "../../../config/firebase"; 
import { randomUUID } from "crypto";

export interface Book {
  id: string;
  title: string;
  author: string;
  dueDate?: string;
  borrowedDate?: string;
  isBorrowed: boolean;
  lateFee: number;
  daysLate: number;
}

const collectionRef = db.collection("books");

// Get ALL books
export const getAllBooks = async (): Promise<Book[]> => {
  const snapshot = await collectionRef.get();
  return snapshot.docs.map((doc) => doc.data() as Book);
};

// Get book by ID
export const getBookById = async (id: string): Promise<Book | undefined> => {
  const doc = await collectionRef.doc(id).get();
  return doc.exists ? (doc.data() as Book) : undefined;
};

// Create Book
export const createBook = async (
  book: Partial<Book>
): Promise<Book> => {
  const newBook: Book = {
  id: randomUUID(),
  title: book.title!,
  author: book.author!,
  isBorrowed: book.isBorrowed ?? false,
  borrowedDate: book.borrowedDate,
  dueDate: book.dueDate,
  daysLate: 0,
  lateFee: 0
};

  await collectionRef.doc(newBook.id).set(newBook);
  return newBook;
};

// Update Book
export const updateBook = async (
  id: string,
  updates: Partial<Book>
): Promise<Book | undefined> => {
  const existing = await getBookById(id);
  if (!existing) return undefined;

  const updatedBook = { ...existing, ...updates };

  await collectionRef.doc(id).update(updatedBook);
  return updatedBook;
};

// Delete Book
export const deleteBook = async (id: string): Promise<boolean> => {
  const existing = await getBookById(id);
  if (!existing) return false;

  await collectionRef.doc(id).delete();
  return true;
};

// LATE FEE UPDATE FUNCTION

export const updateLateFees = async (): Promise<void> => {
  const books = await getAllBooks();
  const today = new Date();

  for (const book of books) {
    // Only update borrowed + overdue books
    if (book.isBorrowed && book.dueDate) {
      const due = new Date(book.dueDate);
      let daysLate = Math.floor(
        (today.getTime() - due.getTime()) / (1000 * 3600 * 24)
      );

      if (daysLate < 0) daysLate = 0;

      const lateFee = daysLate * 1;

      await updateBook(book.id, { daysLate, lateFee });
    }
  }
};

