import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getProfile } from "@/services/profile";
import { renderResumePdf } from "@/services/resume";
import { uploadsDir } from "@/utils/paths";

export const dynamic = "force-dynamic";

export async function GET() {
  const profile = await getProfile();
  const uploadedPath = path.join(uploadsDir, profile.resumeFile);
  const filename = `${profile.fullName.replace(/\s+/g, "_")}_Resume.pdf`;

  if (profile.resumeMode === "uploaded" && existsSync(uploadedPath)) {
    const bytes = await readFile(uploadedPath);
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const pdf = await renderResumePdf(profile);
  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
