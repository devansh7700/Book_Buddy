import { randomUUID } from 'crypto';

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

// Mock database
let books: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isBorrowed: true, borrowedDate: "2025-11-10", dueDate: "2025-11-17", daysLate: 0, lateFee: 0},
  { id: '2', title: '1984', author: 'George Orwell', isBorrowed: false, daysLate: 0, lateFee: 0}
];

export const getAllBooks = (): Book[] => books;

export const getBookById = (id: string): Book | undefined =>
  books.find((b) => b.id === id);

export const createBook = (book: Omit<Book, 'id' | 'daysLate' | 'lateFee'>): Book => {
  const newBook = { id: randomUUID(), ...book, daysLate: 0, lateFee: 0};
  books.push(newBook);
  return newBook;
};

export const updateBook = (id: string, book: Partial<Book>): Book | undefined => {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return undefined;
  books[index] = { ...books[index], ...book };
  return books[index];
};

export const deleteBook = (id: string): boolean => {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
};
