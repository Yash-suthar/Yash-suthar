import path from "node:path";

export const dataDir = path.join(process.cwd(), "data");
export const uploadsDir = path.join(dataDir, "uploads");
export const profilePath = path.join(dataDir, "profile.json");
