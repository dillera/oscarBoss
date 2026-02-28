import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// rank 1 = "My Pick" (2pts), rank 2 = "Academy Pick" (1pt)
// Same nominee in both slots + wins = 2+1 = 3pts total
const POINTS = { 1: 2, 2: 1 } as Record<number, number>;

export async function GET() {
  const winners = await prisma.winner.findMany();
  const winnerMap: Record<number, string> = {};
  for (const w of winners) winnerMap[w.categoryId] = w.nomineeName;

  const users = await prisma.user.findMany({
    include: {
      votes: {
        include: { nominee: true, category: true },
      },
    },
  });

  const leaderboard = users.map((user) => {
    let score = 0;
    const picks: {
      categoryId: number;
      categoryName: string;
      nomineeId: number;
      nomineeName: string;
      rank: number;
      isCorrect: boolean;
    }[] = [];

    for (const vote of user.votes) {
      const winner = winnerMap[vote.categoryId];
      const isCorrect = winner !== undefined && winner === vote.nominee.name;
      if (isCorrect) score += POINTS[vote.rank] ?? 0;
      picks.push({
        categoryId: vote.categoryId,
        categoryName: vote.category.name,
        nomineeId: vote.nomineeId,
        nomineeName: vote.nominee.name,
        rank: vote.rank,
        isCorrect,
      });
    }

    return {
      userId: user.id,
      firstName: user.firstName,
      score,
      totalPicks: user.votes.length,
      picks,
    };
  });

  leaderboard.sort((a, b) => b.score - a.score || b.totalPicks - a.totalPicks);

  return NextResponse.json({ leaderboard, winners: winnerMap });
}
