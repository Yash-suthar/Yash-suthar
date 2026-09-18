import { writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getProfile, saveProfile } from "@/services/profile";
import { isAdminSession } from "@/utils/auth";
import { uploadsDir } from "@/utils/paths";

const photoTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const kind = String(formData.get("kind") || "");
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const profile = await getProfile();
  const buffer = Buffer.from(await file.arrayBuffer());

  if (kind === "photo") {
    const ext = photoTypes[file.type];
    if (!ext) {
      return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
    }
    const photoFile = `photo.${ext}`;
    await writeFile(path.join(uploadsDir, photoFile), buffer);
    profile.photoFile = photoFile;
  } else if (kind === "resume") {
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Resume must be a PDF" }, { status: 400 });
    }
    const resumeFile = "resume.pdf";
    await writeFile(path.join(uploadsDir, resumeFile), buffer);
    profile.resumeFile = resumeFile;
    profile.resumeMode = "uploaded";
  } else {
    return NextResponse.json({ error: "Unknown upload kind" }, { status: 400 });
  }

  await saveProfile(profile);
  return NextResponse.json(profile);
}
