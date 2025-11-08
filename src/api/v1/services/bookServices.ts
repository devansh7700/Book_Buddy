import * as bookRepository from '../repositories/bookRepository';

interface Book {
  id: string;
  title: string;
  author: string;
}

export const getAllBooks = (): Book[] => {
  return bookRepository.getAllBooks();
};

export const getBookById = (id: string): Book | undefined => {
  return bookRepository.getBookById(id);
};

export const createBook = (book: Omit<Book, 'id'>): Book => {
  return bookRepository.createBook(book);
};

export const updateBook = (id: string, book: Partial<Book>): Book | undefined => {
  return bookRepository.updateBook(id, book);
};

export const deleteBook = (id: string): boolean => {
  return bookRepository.deleteBook(id);
};
