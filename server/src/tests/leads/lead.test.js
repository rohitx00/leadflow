import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import prisma from '../../lib/prisma.js';
import jwt from 'jsonwebtoken';

// Setup dummy env var for test
process.env.JWT_SECRET = 'test-secret';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

describe('Lead Lifecycle API Integration', () => {
  const token = generateToken('admin-123');
  
  const mockAuthUser = {
    id: 'admin-123',
    role: 'ADMIN',
    isActive: true,
  };

  it('should create a public lead, then an admin should fetch it', async () => {
    // 1. Create a lead publicly (No auth)
    const newLeadData = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@example.com',
      phone: '1234567890',
      message: 'I am interested'
    };

    prisma.lead.create.mockResolvedValueOnce({
      id: 'lead-1',
      ...newLeadData,
      status: 'NEW',
    });

    const createRes = await request(app)
      .post('/api/v1/leads/public')
      .send(newLeadData);

    expect(createRes.status).toBe(201);
    expect(createRes.body.data.id).toBe('lead-1');

    // 2. Admin fetches leads
    prisma.user.findUnique.mockResolvedValueOnce(mockAuthUser);
    
    // In lead.repository.js, getLeads uses a transaction [findMany, count, groupBy]
    prisma.$transaction.mockResolvedValueOnce([
      [{ id: 'lead-1', ...newLeadData, status: 'NEW' }], // findMany
      1, // count
      [{ status: 'NEW', _count: { status: 1 } }] // groupBy analytics
    ]);

    const fetchRes = await request(app)
      .get('/api/v1/leads')
      .set('Authorization', `Bearer ${token}`);

    expect(fetchRes.status).toBe(200);
    expect(fetchRes.body.data).toHaveLength(1);
    expect(fetchRes.body.data[0].email).toBe('john@example.com');
  });

  it('should allow updating lead status', async () => {
    prisma.user.findUnique.mockResolvedValue(mockAuthUser);
    
    // getLeadById calls findUnique, so we need to mock it
    prisma.lead.findUnique.mockResolvedValue({
      id: 'lead-1',
      status: 'NEW'
    });

    prisma.lead.update.mockResolvedValue({
      id: 'lead-1',
      status: 'CONVERTED'
    });

    const updateRes = await request(app)
      .patch('/api/v1/leads/lead-1')
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'CONVERTED' });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.data.status).toBe('CONVERTED');
  });
});
