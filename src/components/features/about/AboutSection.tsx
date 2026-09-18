import { SectionLabel } from "@/components/common/SectionLabel";
import type { Profile } from "@/types/profile";

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="px-5 py-20 md:px-8">
      <SectionLabel index="01" label="About" />
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="display text-4xl leading-none font-extrabold tracking-tight md:text-6xl">
            Product engineer.
            <span className="block text-muted">Not a tutorial stack.</span>
          </h3>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="rounded-[22px] border border-line bg-bg-elevated p-5">
                <p className="display text-3xl font-extrabold text-accent">{stat.value}</p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-2xl text-lg leading-8 text-muted">
          <p>{profile.about}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {profile.skillGroups.map((group) => (
              <div key={group.label}>
                <p className="mono text-[11px] uppercase tracking-[0.22em] text-accent">{group.label}</p>
                <p className="mt-2 text-fg">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 space-y-4">
            {profile.education.map((item) => (
              <div key={item.school} className="border-t border-line pt-4">
                <p className="font-semibold text-fg">{item.school}</p>
                <p className="text-sm text-muted">
                  {item.credential} · {item.location} · {item.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
