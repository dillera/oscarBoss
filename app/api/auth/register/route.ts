import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  const { firstName } = await req.json();
  if (!firstName || typeof firstName !== "string" || firstName.trim().length < 1) {
    return NextResponse.json({ error: "First name is required" }, { status: 400 });
  }

  const name = firstName.trim();
  const token = randomBytes(32).toString("hex");

  const user = await prisma.user.create({
    data: { firstName: name, token },
  });

  const response = NextResponse.json({ user: { id: user.id, firstName: user.firstName } });
  response.cookies.set("oscar_token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}
