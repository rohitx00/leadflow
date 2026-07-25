import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../lib/prisma.js';
import bcrypt from 'bcrypt';

process.env.JWT_SECRET = 'test-secret';

describe('Auth API Integration', () => {
  describe('POST /api/v1/auth/login', () => {
    it('should return a token and user object for valid credentials', async () => {
      const password = 'TestPassword123!';
      // Create a real hash so bcrypt.compare succeeds
      const hashedPassword = await bcrypt.hash(password, 10);
      
      prisma.user.findUnique.mockResolvedValue({
        id: 'mock-id-123',
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      });

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'jane@example.com', password });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.user.email).toBe('jane@example.com');
      expect(res.body.data.user.role).toBe('ADMIN');
      expect(res.body.data.user.password).toBeUndefined(); // Password shouldn't leak
    });

    it('should return 401 for incorrect password', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      prisma.user.findUnique.mockResolvedValue({
        id: 'mock-id-123',
        email: 'jane@example.com',
        password: hashedPassword,
        isActive: true,
      });

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'jane@example.com', password: 'WrongPassword!' });

      expect(res.status).toBe(401);
      expect(res.body.error.message).toMatch(/invalid/i);
    });

    it('should return 401 for non-existent user', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'nobody@example.com', password: 'Password123!' });

      expect(res.status).toBe(401);
      expect(res.body.error.message).toMatch(/invalid/i);
    });

    it('should return 403 if user is inactive', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'mock-id-123',
        email: 'banned@example.com',
        password: await bcrypt.hash('Password', 10),
        isActive: false,
      });

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'banned@example.com', password: 'Password' });

      expect(res.status).toBe(403);
      expect(res.body.error.message).toMatch(/deactivated/i);
    });
  });
});
