import Article from '../models/Article.js';

export const createArticle = async (req, res) => {
  const article = await Article.create({ ...req.body, author: req.user.id });
  res.status(201).json(article);
};

export const getArticles = async (req, res) => {
  const articles = await Article.find().populate('author', 'username');
  res.json(articles);
};

export const updateArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Not found' });
  if (req.user.role !== 'admin' && req.user.role !== 'editor' && article.author.toString() !== req.user.id)
    return res.status(403).json({ message: 'Forbidden' });
  Object.assign(article, req.body);
  await article.save();
  res.json(article);
};

export const deleteArticle = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can delete' });
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};


// Get one article by ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name email'); // optional
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
