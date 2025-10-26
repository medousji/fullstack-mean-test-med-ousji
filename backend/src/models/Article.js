import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Article', articleSchema);
