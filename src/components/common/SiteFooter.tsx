import type { Profile } from "@/types/profile";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="flex flex-col gap-3 border-t border-line px-5 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
      <p className="mono text-xs uppercase tracking-[0.2em]">
        {profile.fullName} · Gujarat
      </p>
      <p>Built as a live product studio — not a template.</p>
    </footer>
  );
}
