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

export const updateLateFees = (): void => {
  const today = new Date();
  const books = bookRepository.getAllBooks();

  books.forEach((book: Book) => {
    if (book.isBorrowed && book.dueDate) {
      const due = new Date(book.dueDate);
      let daysLate = Math.floor((today.getTime() - due.getTime()) / (1000 * 3600 * 24));
      if (daysLate < 0) daysLate = 0;

      book.daysLate = daysLate;
      book.lateFee = daysLate * 1; // $1 per day
    }
  });
};