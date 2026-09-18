import { mkdir, readFile, writeFile } from "node:fs/promises";
import { profilePath, uploadsDir } from "@/utils/paths";
import type { Profile } from "@/types/profile";

export async function getProfile(): Promise<Profile> {
  await mkdir(uploadsDir, { recursive: true });
  const raw = await readFile(profilePath, "utf8");
  return JSON.parse(raw) as Profile;
}

export async function saveProfile(profile: Profile) {
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(profilePath, `${JSON.stringify(profile, null, 2)}\n`, "utf8");
  return profile;
}
