import prisma from './lib/prisma.js';

async function testDelete() {
  try {
    const userId = '8b47d83c-a126-42c3-bb1c-60f3b9da82c4';
    await prisma.user.delete({
      where: { id: userId },
    });
    console.log('Deleted successfully');
  } catch (err) {
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
  }
}

testDelete();
