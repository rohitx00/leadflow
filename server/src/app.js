import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

import { authRoutes } from './modules/auth/index.js';
import { userRoutes } from './modules/users/index.js';
import { leadRoutes } from './modules/leads/index.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/leads', leadRoutes);

// Basic health check route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
