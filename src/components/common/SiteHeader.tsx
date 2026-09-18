const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between gap-6 px-5 py-5 md:px-8">
      <a href="#top" className="display text-sm font-bold tracking-[0.28em] uppercase">
        YS / Studio
      </a>
      <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-fg">
            {link.label}
          </a>
        ))}
      </nav>
      <a
        href="/api/resume"
        className="rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-fg hover:bg-[#f2efe8] hover:text-[#0c0d0f]"
      >
        Resume
      </a>
    </header>
  );
}
