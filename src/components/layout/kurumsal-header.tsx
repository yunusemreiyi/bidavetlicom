"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#hakkinda", label: "Hakkında" },
  { href: "#program", label: "Program" },
  { href: "#konum", label: "Konum" },
];

export function KurumsalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 40);
      setProgress(max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled
          ? "border-b border-line bg-obsidian/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="flex items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="font-serif text-xl italic text-ivory">
          bi<span className="gold-shimmer not-italic">davetli</span>
          <span className="text-gold">.com</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                activeHref === link.href
                  ? "text-gold"
                  : "text-mist hover:text-ivory",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button asChild size="sm" variant="outline">
          <a href="#lcv">Katılım Bildir</a>
        </Button>
      </div>

      <div className="h-px w-full bg-line">
        <div
          className="h-px bg-gold transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}
