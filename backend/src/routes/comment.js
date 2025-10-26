import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  getComments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';

const router = express.Router();

// Public
router.get('/', getComments);
router.get('/:id', getCommentById);

// Protected
router.post('/', verifyToken, addComment);
router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);

export default router;
