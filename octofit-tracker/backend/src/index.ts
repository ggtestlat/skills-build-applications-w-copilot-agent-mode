import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit';

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB: ${MONGODB_URI}`);
});
