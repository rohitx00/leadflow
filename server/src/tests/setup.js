import { beforeEach, vi } from 'vitest';
import { mockReset } from 'vitest-mock-extended';
import prisma from '../lib/prisma.js';

vi.mock('../lib/prisma.js');

beforeEach(() => {
  mockReset(prisma);
});
