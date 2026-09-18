import type { Profile } from "@/types/profile";

export function SkillsMarquee({ profile }: { profile: Profile }) {
  const items = profile.skillGroups.flatMap((group) => group.items);
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line py-4">
      <div className="marquee-track gap-10 px-6">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="mono text-xs uppercase tracking-[0.28em] text-muted">
            {item}
            <span className="ml-10 text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
