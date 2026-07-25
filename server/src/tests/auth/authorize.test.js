import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../lib/prisma.js';
import jwt from 'jsonwebtoken';

// Setup dummy env var for test
process.env.JWT_SECRET = 'test-secret';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

describe('Authorization Middleware', () => {
  describe('GET /api/v1/users', () => {
    it('should allow ADMIN users to access', async () => {
      const token = generateToken('admin-123');
      
      // Mock the authenticate middleware user lookup
      prisma.user.findUnique.mockResolvedValueOnce({
        id: 'admin-123',
        role: 'ADMIN',
        isActive: true,
      });

      // Mock the getUsers controller call
      prisma.user.findMany.mockResolvedValue([]);

      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should deny access to MEMBER users (403 Forbidden)', async () => {
      const token = generateToken('member-123');
      
      // Mock the authenticate middleware user lookup
      prisma.user.findUnique.mockResolvedValueOnce({
        id: 'member-123',
        role: 'MEMBER',
        isActive: true,
      });

      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
      expect(res.body.error.message).toMatch(/not authorized/i);
    });

    it('should deny access if token is missing (401 Unauthorized)', async () => {
      const res = await request(app).get('/api/v1/users');

      expect(res.status).toBe(401);
      expect(res.body.error.message).toMatch(/not authorized/i);
    });
  });
});
