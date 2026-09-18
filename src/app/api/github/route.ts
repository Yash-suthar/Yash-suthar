import { NextResponse } from "next/server";
import { getGithubRepos } from "@/services/github";
import { getProfile } from "@/services/profile";

export async function GET() {
  const profile = await getProfile();
  const repos = await getGithubRepos(profile.githubUsername);
  return NextResponse.json(repos);
}
