import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import { CATEGORIES } from "../lib/oscarsData";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("Seeding database...");

  for (const cat of CATEGORIES) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: { sortOrder: cat.sortOrder, info: cat.info ?? null },
      create: { name: cat.name, sortOrder: cat.sortOrder, info: cat.info ?? null },
    });

    for (const nom of cat.nominees) {
      const existing = await prisma.nominee.findFirst({
        where: { name: nom.name, categoryId: category.id },
      });
      if (!existing) {
        await prisma.nominee.create({
          data: {
            name: nom.name,
            categoryId: category.id,
            imageUrl: nom.imageUrl,
            trailerUrl: nom.trailerUrl,
          },
        });
      } else {
        await prisma.nominee.update({
          where: { id: existing.id },
          data: { imageUrl: nom.imageUrl, trailerUrl: nom.trailerUrl },
        });
      }
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
