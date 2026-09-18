import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createSessionToken, passwordMatches } from "@/utils/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (!passwordMatches(body.password || "")) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: false,
  });
  return response;
}
