import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'mahveertuitioncenter@gmail.com';
  const plain = process.env.SEED_ADMIN_PASSWORD ?? 'admin123'; // change before prod
  const hashed = await bcrypt.hash(plain, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { password: hashed },
    create: {
      email,
      password: hashed,
      role: 'admin',
    },
  });

  console.log(`Seeded admin: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
