import { SectionLabel } from "@/components/common/SectionLabel";
import type { Profile } from "@/types/profile";

export function WorkSection({ profile }: { profile: Profile }) {
  return (
    <section id="work" className="px-5 py-20 md:px-8">
      <SectionLabel index="03" label="Selected work" />
      <div className="space-y-4">
        {profile.projects.map((project, index) => (
          <article
            key={project.name}
            className="group grid gap-6 rounded-[28px] border border-line bg-bg-elevated p-6 transition-colors hover:border-accent/50 md:grid-cols-[90px_1fr_180px] md:p-8"
          >
            <p className="display text-3xl font-extrabold text-muted group-hover:text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <h3 className="display text-3xl font-extrabold tracking-tight">{project.name}</h3>
                <p className="mono text-xs uppercase tracking-[0.2em] text-muted">{project.period}</p>
              </div>
              <p className="mt-3 max-w-3xl text-muted">{project.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-fg/90">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap content-start gap-2 md:justify-end">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="h-fit rounded-full border border-line px-3 py-1 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
