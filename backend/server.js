import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

// Connect DB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'));

// Import routes
import authRoutes from './src/routes/auth.js';
import articleRoutes from './src/routes/article.js';
import commentRoutes from './src/routes/comment.js';

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('new-comment', (comment) => {
    io.emit('update-comments', comment);
  });
});

server.listen(process.env.PORT || 4000, () => console.log('Server running'));

app.get('/', (req, res) => {
  res.send('✅ API is running...');
});