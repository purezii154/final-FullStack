const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.task.createMany({
    data: [
      { title: 'Setup Supabase Database', completed: true },
      { title: 'Deploy Backend to Render', completed: false },
      { title: 'Deploy Frontend to Netlify', completed: false }
    ]
  });
  console.log('✅ Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });