import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "nico@contentking.de" },
    update: {},
    create: {
      email: "nico@contentking.de",
      name: "Nico",
      role: "ADMIN",
    },
  });

  console.log("Seed-User erstellt:", user);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
