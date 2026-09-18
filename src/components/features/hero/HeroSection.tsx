import type { Profile } from "@/types/profile";

export function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section className="relative px-5 pb-12 pt-6 md:px-8 md:pb-16">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative grid min-w-0 items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="rise max-w-2xl">
          <p className="mono mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.availability}
          </p>
          <p className="mono text-xs uppercase tracking-[0.22em] text-muted">{profile.fullName}</p>
          <h1 className="display mt-2 text-4xl leading-tight font-extrabold tracking-[-0.04em] text-fg sm:text-5xl">
            {profile.displayName}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg">{profile.headline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/api/resume"
              className="rounded-full bg-[#f2efe8] px-5 py-2.5 text-sm font-semibold tracking-wide text-[#0c0d0f] transition-transform hover:-translate-y-0.5"
            >
              Download resume
            </a>
            <a
              href="#work"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold tracking-wide hover:border-fg"
            >
              Selected work
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold tracking-wide hover:border-fg"
            >
              Email me
            </a>
          </div>
        </div>

        <div className="rise relative w-40 shrink-0 sm:w-48" style={{ animationDelay: "120ms" }}>
          <div className="overflow-hidden rounded-2xl border border-line bg-bg-elevated">
            <img
              src="/api/media/photo"
              alt={`${profile.displayName} portrait`}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          <p className="mt-3 text-xs text-muted">{profile.location}</p>
        </div>
      </div>
    </section>
  );
}
