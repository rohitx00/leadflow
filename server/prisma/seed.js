import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@leadflow.com' },
    update: {},
    create: {
      email: 'admin@leadflow.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  const member = await prisma.user.upsert({
    where: { email: 'member@leadflow.com' },
    update: {},
    create: {
      email: 'member@leadflow.com',
      password: hashedPassword,
      name: 'Sales Member',
      role: 'MEMBER',
    },
  });

  console.log('--- Seed successful! ---');
  console.log('Admin Credentials:');
  console.log('Email:', admin.email);
  console.log('Password: password123');
  console.log('------------------------');
  console.log('Member Credentials:');
  console.log('Email:', member.email);
  console.log('Password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
