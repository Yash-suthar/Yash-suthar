import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getProfile } from "@/services/profile";
import { uploadsDir } from "@/utils/paths";

const mime: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ file: string }> },
) {
  const { file } = await context.params;
  const profile = await getProfile();
  const allowed = new Set(["photo", "resume", profile.photoFile, profile.resumeFile]);
  if (!allowed.has(file)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filename = file === "photo" ? profile.photoFile : file === "resume" ? profile.resumeFile : file;
  const ext = filename.split(".").pop() || "";
  try {
    const bytes = await readFile(path.join(uploadsDir, filename));
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": mime[ext] || "application/octet-stream",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
