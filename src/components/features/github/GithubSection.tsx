import { SectionLabel } from "@/components/common/SectionLabel";
import type { GithubRepo } from "@/services/github";

export function GithubSection({ repos }: { repos: GithubRepo[] }) {
  return (
    <section id="github" className="px-5 py-20 md:px-8">
      <SectionLabel index="04" label="GitHub" />
      <p className="mb-10 max-w-2xl text-muted">
        Public repositories from github.com/Yash-suthar. Featured product work above is from
        shipped client and production systems; this is the open trail.
      </p>
      {repos.length === 0 ? (
        <p className="text-muted">GitHub repositories could not be loaded right now.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.html_url}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-44 flex-col justify-between rounded-[24px] border border-line bg-bg-elevated p-6 transition-colors hover:border-accent"
            >
              <div>
                <p className="display text-2xl font-bold">{repo.name}</p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {repo.description || "Repository on GitHub."}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
                <span>{repo.language || "Source"}</span>
                <span>★ {repo.stargazers_count}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
