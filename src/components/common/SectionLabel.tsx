export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="mono text-xs text-accent">{index}</span>
      <h2 className="display text-sm font-bold uppercase tracking-[0.32em]">{label}</h2>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
