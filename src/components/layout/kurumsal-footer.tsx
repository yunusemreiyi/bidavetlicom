import Link from "next/link";
import { ArrowUp } from "lucide-react";

const quickLinks = [
  { href: "#hakkinda", label: "Hakkında" },
  { href: "#program", label: "Program" },
  { href: "#konum", label: "Konum" },
  { href: "#lcv", label: "LCV" },
];

export function KurumsalFooter() {
  return (
    <footer className="relative border-t border-line bg-obsidian px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,_transparent,_rgba(201,164,92,0.5),_transparent)]" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <Link href="/" className="font-serif text-2xl italic text-ivory">
            bi<span className="gold-shimmer not-italic">davetli</span>
            <span className="text-gold">.com</span>
          </Link>
          <p className="max-w-xs text-sm font-light leading-relaxed text-mist">
            Kurumsal etkinlikler için dijital davet ve LCV yönetimi.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-mist transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#"
          className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full border border-gold/40 text-gold transition-colors hover:border-gold hover:bg-gold/10 sm:self-auto"
          aria-label="Yukarı çık"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
        </a>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-mist sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <Link href="/" className="text-gold">
            bidavetli.com
          </Link>{" "}
          — Tüm hakları saklıdır.
        </p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-mist/70">
          Kurumsal Davet Platformu
        </p>
      </div>
    </footer>
  );
}
