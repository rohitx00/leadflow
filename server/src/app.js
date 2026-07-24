import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
