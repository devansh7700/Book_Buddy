import { randomUUID } from 'crypto';

interface Book {
  id: string;
  title: string;
  author: string;
}

// Mock database
let books: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: '2', title: '1984', author: 'George Orwell' },
];

export const getAllBooks = (): Book[] => books;

export const getBookById = (id: string): Book | undefined =>
  books.find((b) => b.id === id);

export const createBook = (book: Omit<Book, 'id'>): Book => {
  const newBook = { id: randomUUID(), ...book };
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
