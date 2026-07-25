import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockLeads = [
  { firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', phone: '555-0101', company: 'Acme Corp', status: 'NEW', source: 'WEBSITE' },
  { firstName: 'Bob', lastName: 'Jones', email: 'bob.jones@example.com', phone: '555-0102', company: 'Globex', status: 'CONTACTED', source: 'REFERRAL' },
  { firstName: 'Charlie', lastName: 'Brown', email: 'charlie.b@example.com', phone: '555-0103', company: 'Initech', status: 'QUALIFIED', source: 'OTHER' },
  { firstName: 'Diana', lastName: 'Prince', email: 'diana.p@example.com', phone: '555-0104', company: 'Wayne Ent', status: 'CONVERTED', source: 'WEBSITE' },
  { firstName: 'Evan', lastName: 'Wright', email: 'evan.w@example.com', phone: '555-0105', company: 'Stark Ind', status: 'LOST', source: 'MANUAL' },
  { firstName: 'Fiona', lastName: 'Gallagher', email: 'fiona.g@example.com', phone: '555-0106', company: 'Dunder Mifflin', status: 'NEW', source: 'REFERRAL' },
  { firstName: 'George', lastName: 'Costanza', email: 'george.c@example.com', phone: '555-0107', company: 'Vandelay Ind', status: 'CONTACTED', source: 'OTHER' },
  { firstName: 'Hannah', lastName: 'Abbott', email: 'hannah.a@example.com', phone: '555-0108', company: 'Hogwarts', status: 'CONVERTED', source: 'MANUAL' },
  { firstName: 'Ian', lastName: 'Malcolm', email: 'ian.m@example.com', phone: '555-0109', company: 'InGen', status: 'QUALIFIED', source: 'WEBSITE' },
  { firstName: 'Julia', lastName: 'Child', email: 'julia.c@example.com', phone: '555-0110', company: 'Food Net', status: 'NEW', source: 'REFERRAL' },
];

async function main() {
  console.log('Seeding 10 mock leads...');
  for (const lead of mockLeads) {
    await prisma.lead.create({
      data: lead
    });
  }
  console.log('Successfully seeded 10 leads!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
