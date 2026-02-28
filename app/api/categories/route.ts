import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("oscar_token")?.value;
  let userId: number | null = null;

  if (token) {
    const user = await prisma.user.findUnique({ where: { token } });
    if (user) userId = user.id;
  }

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      nominees: true,
      winner: true,
    },
  });

  let userVotes: { categoryId: number; nomineeId: number; rank: number }[] = [];
  if (userId) {
    userVotes = await prisma.vote.findMany({
      where: { userId },
      select: { categoryId: true, nomineeId: true, rank: true },
    });
  }

  const votesByCategory: Record<number, { nomineeId: number; rank: number }[]> = {};
  for (const v of userVotes) {
    if (!votesByCategory[v.categoryId]) votesByCategory[v.categoryId] = [];
    votesByCategory[v.categoryId].push({ nomineeId: v.nomineeId, rank: v.rank });
  }

  return NextResponse.json({
    categories,
    userVotes: votesByCategory,
  });
}
