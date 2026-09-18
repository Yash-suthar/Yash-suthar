import { SectionLabel } from "@/components/common/SectionLabel";
import type { Profile } from "@/types/profile";

export function ExperienceSection({ profile }: { profile: Profile }) {
  return (
    <section id="experience" className="px-5 py-10 md:px-8">
      <SectionLabel index="02" label="Experience" />
      <div className="space-y-8">
        {profile.experience.map((job) => (
          <article key={`${job.role}-${job.period}`} className="rounded-[28px] border border-line bg-bg-elevated p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="display text-3xl font-extrabold">{job.role}</h3>
                <p className="mt-2 text-muted">
                  {job.organization} · {job.location}
                </p>
              </div>
              <p className="mono text-xs uppercase tracking-[0.2em] text-accent">{job.period}</p>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-fg/90">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
