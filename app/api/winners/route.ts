import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const winners = await prisma.winner.findMany({
    include: { category: true },
  });
  return NextResponse.json({ winners });
}

export async function POST(req: NextRequest) {
  const { categoryId, nomineeName } = await req.json();
  if (!categoryId || !nomineeName) {
    return NextResponse.json({ error: "categoryId and nomineeName required" }, { status: 400 });
  }

  const winner = await prisma.winner.upsert({
    where: { categoryId },
    update: { nomineeName, announcedAt: new Date() },
    create: { categoryId, nomineeName },
  });

  return NextResponse.json({ winner });
}

export async function DELETE(req: NextRequest) {
  const { categoryId } = await req.json();
  if (!categoryId) return NextResponse.json({ error: "categoryId required" }, { status: 400 });

  await prisma.winner.deleteMany({ where: { categoryId } });
  return NextResponse.json({ success: true });
}
