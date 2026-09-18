export type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  size: number;
  topics: string[];
};

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "yash-suthar-portfolio",
      },
      next: { revalidate: 1800 },
    },
  );

  if (!response.ok) return [];

  const repos = (await response.json()) as GithubRepo[];
  return repos.filter(
    (repo) =>
      !repo.fork &&
      repo.size > 0 &&
      repo.name.toLowerCase() !== username.toLowerCase() &&
      repo.name.toLowerCase() !== "test",
  );
}
