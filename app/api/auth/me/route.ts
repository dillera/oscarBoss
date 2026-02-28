import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("oscar_token")?.value;
  if (!token) return NextResponse.json({ user: null });

  const user = await prisma.user.findUnique({ where: { token } });
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({ user: { id: user.id, firstName: user.firstName } });
}
