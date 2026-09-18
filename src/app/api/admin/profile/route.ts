import { NextResponse } from "next/server";
import { getProfile, saveProfile } from "@/services/profile";
import type { Profile } from "@/types/profile";
import { isAdminSession } from "@/utils/auth";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getProfile());
}

export async function PUT(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const incoming = (await request.json()) as Profile;
  const current = await getProfile();
  const nextProfile: Profile = {
    ...current,
    ...incoming,
    photoFile: current.photoFile,
    resumeFile: incoming.resumeFile || current.resumeFile,
  };
  await saveProfile(nextProfile);
  return NextResponse.json(nextProfile);
}
