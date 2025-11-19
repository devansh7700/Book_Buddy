
import express from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook, calculateLateFee } from '../controllers/bookController';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.get("/:id/late-fee", calculateLateFee);

export default router;
