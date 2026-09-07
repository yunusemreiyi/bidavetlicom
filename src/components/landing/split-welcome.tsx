"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type PanelKey = "kurumsal" | "dugun";

const panels: {
  key: PanelKey;
  href: string;
  label: string;
  title: string;
  description: string;
  icon: typeof Building2;
  align: "left" | "right";
}[] = [
  {
    key: "kurumsal",
    href: "/kurumsal",
    label: "Kurumsal",
    title: "Kurumsal\nDavetler",
    description: "Şirket etkinlikleri için LCV & davet yönetimi",
    icon: Building2,
    align: "left",
  },
  {
    key: "dugun",
    href: "/dugun",
    label: "Düğün",
    title: "Düğün\nDavetiyesi",
    description: "Özel gününüz için dijital davetiye deneyimi",
    icon: Heart,
    align: "right",
  },
];

export function SplitWelcome() {
  const [hovered, setHovered] = useState<PanelKey | null>(null);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-obsidian">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,164,92,0.08),_transparent_60%)]" />

      <header className="relative z-20 flex w-full items-center justify-center py-8">
        <span className="font-serif text-2xl italic tracking-wide text-ivory sm:text-3xl">
          bi<span className="gold-shimmer not-italic">davetli</span>
          <span className="text-gold">.com</span>
        </span>
      </header>

      <div className="relative z-10 flex flex-1 flex-col sm:flex-row">
        {panels.map((panel) => {
          const Icon = panel.icon;
          const isHovered = hovered === panel.key;
          const isDimmed = hovered !== null && !isHovered;

          return (
            <Link
              key={panel.key}
              href={panel.href}
              onMouseEnter={() => setHovered(panel.key)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "group relative flex min-h-[45vh] flex-1 items-center justify-center overflow-hidden transition-colors duration-700 sm:min-h-0",
                panel.key === "kurumsal"
                  ? "border-b border-line sm:border-b-0 sm:border-r"
                  : "",
              )}
            >
              <motion.div
                aria-hidden
                className={cn(
                  "absolute inset-0",
                  panel.key === "kurumsal"
                    ? "bg-gradient-to-br from-obsidian-elevated via-obsidian to-ink"
                    : "bg-gradient-to-bl from-obsidian-elevated via-obsidian to-ink",
                )}
                animate={{ scale: isHovered ? 1.06 : 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />

              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(201,164,92,0.16), transparent 55%)",
                }}
                transition={{ duration: 0.6 }}
              />

              <motion.div
                initial={false}
                animate={{
                  opacity: isDimmed ? 0.45 : 1,
                  y: isHovered ? -6 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center gap-5 px-8 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>

                <h2 className="whitespace-pre-line font-serif text-4xl font-medium leading-[1.05] text-ivory sm:text-5xl lg:text-6xl">
                  {panel.title}
                </h2>

                <p className="max-w-xs text-sm font-light tracking-wide text-mist sm:text-base">
                  {panel.description}
                </p>

                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  Devam Et
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={2}
                  />
                </span>
              </motion.div>

              <span
                className={cn(
                  "pointer-events-none absolute bottom-8 text-[11px] uppercase tracking-[0.3em] text-mist/60",
                  panel.align === "left" ? "left-8" : "right-8",
                )}
              >
                {panel.label}
              </span>
            </Link>
          );
        })}

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-obsidian/80 backdrop-blur sm:flex">
          <span className="font-serif text-sm italic text-gold">veya</span>
        </div>
      </div>
    </div>
  );
}
