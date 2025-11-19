import * as bookRepository from '../repositories/bookRepository';

interface Book {
  id: string;
  title: string;
  author: string;
  dueDate?: string;        
  borrowedDate?: string;   
  isBorrowed: boolean;     
  lateFee: number;
  daysLate: number;
}

export const getAllBooks = (): Book[] => {
  return bookRepository.getAllBooks();
};

export const getBookById = (id: string): Book | undefined => {
  return bookRepository.getBookById(id);
};

export const createBook = (book: Omit<Book, 'id' | 'daysLate' | 'lateFee'>): Book => {
  return bookRepository.createBook(book);
};

export const updateBook = (id: string, book: Partial<Book>): Book | undefined => {
  return bookRepository.updateBook(id, book);
};

export const deleteBook = (id: string): boolean => {
  return bookRepository.deleteBook(id);
};

