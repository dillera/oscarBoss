/**
 * Results Tally Script — OscarBoss 2026
 *
 * Run on ceremony night (March 15, 2026) to enter winners and see live scores.
 *
 * Usage:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/tally-results.ts --list
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/tally-results.ts --set "Best Picture" "Sinners"
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/tally-results.ts --scores
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/tally-results.ts --clear "Best Picture"
 */

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

// rank 1 = My Pick (2pts), rank 2 = Academy Pick (1pt)
const POINTS: Record<number, number> = { 1: 2, 2: 1 };

async function listCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { nominees: true, winner: true },
  });

  console.log("\n📋 All Categories & Current Winners\n");
  console.log("─".repeat(60));

  for (const cat of categories) {
    const status = cat.winner ? `✅ ${cat.winner.nomineeName}` : "⏳ Not announced";
    console.log(`[${cat.id}] ${cat.name}`);
    console.log(`     ${status}`);
    console.log(`     Nominees: ${cat.nominees.map((n) => n.name).join(", ")}`);
    console.log();
  }
}

async function setWinner(categoryName: string, nomineeName: string) {
  const category = await prisma.category.findFirst({
    where: { name: { contains: categoryName } },
    include: { nominees: true },
  });

  if (!category) {
    console.error(`❌ Category not found: "${categoryName}"`);
    console.log("   Try a partial match, e.g., 'Best Picture' or 'Actor'");
    return;
  }

  const nominee = category.nominees.find(
    (n) => n.name.toLowerCase().includes(nomineeName.toLowerCase())
  );

  if (!nominee) {
    console.error(`❌ Nominee not found: "${nomineeName}" in "${category.name}"`);
    console.log(`   Available: ${category.nominees.map((n) => n.name).join(", ")}`);
    return;
  }

  await prisma.winner.upsert({
    where: { categoryId: category.id },
    update: { nomineeName: nominee.name, announcedAt: new Date() },
    create: { categoryId: category.id, nomineeName: nominee.name },
  });

  console.log(`\n🏆 Winner set!`);
  console.log(`   Category: ${category.name}`);
  console.log(`   Winner:   ${nominee.name}\n`);
}

async function clearWinner(categoryName: string) {
  const category = await prisma.category.findFirst({
    where: { name: { contains: categoryName } },
  });

  if (!category) {
    console.error(`❌ Category not found: "${categoryName}"`);
    return;
  }

  await prisma.winner.deleteMany({ where: { categoryId: category.id } });
  console.log(`\n🗑️  Cleared winner for: ${category.name}\n`);
}

async function showScores() {
  const winners = await prisma.winner.findMany();
  const winnerMap: Record<number, string> = {};
  for (const w of winners) winnerMap[w.categoryId] = w.nomineeName;

  const users = await prisma.user.findMany({
    include: {
      votes: { include: { nominee: true, category: true } },
    },
  });

  const leaderboard = users.map((user) => {
    let score = 0;
    let correct = 0;

    for (const vote of user.votes) {
      const winner = winnerMap[vote.categoryId];
      if (winner && winner === vote.nominee.name) {
        score += POINTS[vote.rank] ?? 0;
        correct++;
      }
    }

    return {
      firstName: user.firstName,
      score,
      correct,
      totalPicks: user.votes.length,
    };
  });

  leaderboard.sort((a, b) => b.score - a.score);

  console.log("\n🏆 OscarBoss Leaderboard (My Pick=2pts · Academy Pick=1pt · Both=3pts)\n");
  console.log("─".repeat(50));
  console.log(`${"Rank".padEnd(6)}${"Name".padEnd(20)}${"Score".padEnd(10)}${"Correct".padEnd(10)}Picks`);
  console.log("─".repeat(50));

  for (let i = 0; i < leaderboard.length; i++) {
    const e = leaderboard[i];
    const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1} `;
    console.log(
      `${medal.padEnd(6)}${e.firstName.padEnd(20)}${String(e.score).padEnd(10)}${String(e.correct).padEnd(10)}${e.totalPicks}`
    );
  }

  console.log("─".repeat(50));
  console.log(`\nWinners announced: ${Object.keys(winnerMap).length}\n`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--list") {
    await listCategories();
  } else if (args[0] === "--set" && args[1] && args[2]) {
    await setWinner(args[1], args[2]);
  } else if (args[0] === "--clear" && args[1]) {
    await clearWinner(args[1]);
  } else if (args[0] === "--scores") {
    await showScores();
  } else {
    console.log(`
OscarBoss Results Tally Script

Commands:
  --list                        List all categories and current winners
  --set <category> <nominee>    Set a winner (partial match supported)
  --clear <category>            Clear a winner
  --scores                      Show current leaderboard scores

Examples:
  npx ts-node scripts/tally-results.ts --list
  npx ts-node scripts/tally-results.ts --set "Best Picture" "Sinners"
  npx ts-node scripts/tally-results.ts --set "Actor" "Chalamet"
  npx ts-node scripts/tally-results.ts --scores
    `);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
