import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { firstName } = await req.json();
  if (!firstName || typeof firstName !== "string") {
    return NextResponse.json({ error: "First name is required" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { firstName: { equals: firstName.trim() } },
    orderBy: { createdAt: "desc" },
  });

  if (!user) {
    return NextResponse.json({ error: "No account found. Please register first." }, { status: 404 });
  }

  const response = NextResponse.json({ user: { id: user.id, firstName: user.firstName } });
  response.cookies.set("oscar_token", user.token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}
