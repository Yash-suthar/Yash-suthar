import { SectionLabel } from "@/components/common/SectionLabel";
import type { Profile } from "@/types/profile";

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="px-5 py-20 md:px-8">
      <SectionLabel index="04" label="Contact" />
      <p className="mono text-xs uppercase tracking-[0.24em] text-muted">Direct line</p>
      <a
        href={`mailto:${profile.email}`}
        className="display mt-4 block text-2xl leading-snug font-extrabold tracking-[-0.03em] break-all hover:text-accent md:text-4xl"
      >
        {profile.email}
      </a>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={`tel:${profile.phone.replace(/\s/g, "")}`}
          className="rounded-full border border-line px-5 py-3 text-sm hover:border-accent"
        >
          {profile.phone}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-5 py-3 text-sm hover:border-accent"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-5 py-3 text-sm hover:border-accent"
        >
          LinkedIn
        </a>
        <a
          href="/api/resume"
          className="rounded-full bg-[#f2efe8] px-5 py-3 text-sm font-semibold text-[#0c0d0f]"
        >
          Download resume
        </a>
      </div>
    </section>
  );
}
