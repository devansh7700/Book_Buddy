import { db } from '../../../config/firebase'; 
import { Book } from '../repositories/bookRepository'; 

const booksCollection = db.collection('books');

export const getAllBooks = async (): Promise<Book[]> => {
  const snapshot = await booksCollection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
};

export const getBookById = async (id: string): Promise<Book | undefined> => {
  const doc = await booksCollection.doc(id).get();
  if (!doc.exists) return undefined;
  return { id: doc.id, ...doc.data() } as Book;
};

export const createBook = async (book: Omit<Book, 'id' | 'daysLate' | 'lateFee'>): Promise<Book> => {
  const newBook = { ...book, daysLate: 0, lateFee: 0 };
  const docRef = await booksCollection.add(newBook);
  return { id: docRef.id, ...newBook } as Book;
};

export const updateBook = async (id: string, book: Partial<Book>): Promise<Book | undefined> => {
  const docRef = booksCollection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return undefined;

  await docRef.update(book);
  const updatedDoc = await docRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() } as Book;
};

export const deleteBook = async (id: string): Promise<boolean> => {
  const docRef = booksCollection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;

  await docRef.delete();
  return true;
};

export const updateLateFees = async (): Promise<void> => {
  const snapshot = await booksCollection.where('isBorrowed', '==', true).get();

  const today = new Date();

  const updates = snapshot.docs.map(async doc => {
    const book = doc.data() as Book;
    if (!book.dueDate) return;

    const due = new Date(book.dueDate);
    let daysLate = Math.floor((today.getTime() - due.getTime()) / (1000 * 3600 * 24));
    if (daysLate < 0) daysLate = 0;

    await booksCollection.doc(doc.id).update({
      daysLate,
      lateFee: daysLate * 1 // $1 per day
    });
  });

  // Wait for all updates to complete
  await Promise.all(updates);
  console.log("Late fees updated for all borrowed books.");
};
