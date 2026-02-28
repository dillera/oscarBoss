import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

async function getUser(req: NextRequest) {
  const token = req.cookies.get("oscar_token")?.value;
  if (!token) return null;
  return prisma.user.findUnique({ where: { token } });
}

export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { categoryId, picks } = await req.json();
  // picks: [{ nomineeId, rank }] rank = 1,2,3

  if (!categoryId || !Array.isArray(picks)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  if (picks.length > 2) {
    return NextResponse.json({ error: "Max 2 picks per category" }, { status: 400 });
  }
  const validRanks = picks.every((p: { rank: number }) => p.rank === 1 || p.rank === 2);
  if (!validRanks) {
    return NextResponse.json({ error: "Rank must be 1 (My Pick) or 2 (Academy Pick)" }, { status: 400 });
  }

  // Validate all nominees belong to this category (same nominee allowed for both ranks)
  const uniqueNomineeIds = [...new Set(picks.map((p: { nomineeId: number }) => p.nomineeId))];
  const nominees = await prisma.nominee.findMany({
    where: { id: { in: uniqueNomineeIds }, categoryId },
  });
  if (nominees.length !== uniqueNomineeIds.length) {
    return NextResponse.json({ error: "Invalid nominees" }, { status: 400 });
  }

  // Delete existing votes for this user/category
  await prisma.vote.deleteMany({ where: { userId: user.id, categoryId } });

  // Insert new votes
  if (picks.length > 0) {
    await prisma.vote.createMany({
      data: picks.map((p: { nomineeId: number; rank: number }) => ({
        userId: user.id,
        categoryId,
        nomineeId: p.nomineeId,
        rank: p.rank,
      })),
    });
  }

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ votes: {} });

  const votes = await prisma.vote.findMany({
    where: { userId: user.id },
    include: { nominee: true, category: true },
  });

  const grouped: Record<number, typeof votes> = {};
  for (const v of votes) {
    if (!grouped[v.categoryId]) grouped[v.categoryId] = [];
    grouped[v.categoryId].push(v);
  }

  return NextResponse.json({ votes: grouped });
}
