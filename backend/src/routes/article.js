import express from 'express';
import { verifyToken, permit } from '../middlewares/authMiddleware.js';
import { createArticle, getArticles, updateArticle, deleteArticle ,getArticleById } from '../controllers/articleController.js';

const router = express.Router();
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', verifyToken, permit('writer', 'editor', 'admin'), createArticle);
router.put('/:id', verifyToken, updateArticle);
router.delete('/:id', verifyToken, permit('admin'), deleteArticle);


export default router;
