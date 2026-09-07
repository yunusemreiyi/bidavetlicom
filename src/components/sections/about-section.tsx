"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "01", label: "Gece, Sınırsız Anı" },
  { value: "250+", label: "Davetli Kapasitesi" },
  { value: "6", label: "Saat Süren Deneyim" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const layers = sectionRef.current?.querySelectorAll<HTMLElement>(
        "[data-speed]",
      );

      layers?.forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "1");
        gsap.to(el, {
          yPercent: (1 - speed) * 40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hakkinda"
      ref={sectionRef}
      className="relative overflow-hidden bg-obsidian-soft py-32"
    >
      <div
        data-speed="0.6"
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-gold/[0.06] blur-3xl"
      />
      <div
        data-speed="1.4"
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/[0.05] blur-3xl"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-16 px-6">
        <div className="flex flex-col gap-6">
          <span
            data-speed="1.2"
            className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold"
          >
            Etkinlik Konsepti
          </span>
          <h2
            data-speed="0.85"
            className="max-w-3xl text-balance font-serif text-4xl italic leading-tight text-ivory sm:text-5xl lg:text-6xl"
          >
            Zarafetin ve kurumsal vizyonun{" "}
            <span className="gold-shimmer not-italic">buluştuğu</span> bir gece
          </h2>
          <p
            data-speed="1.1"
            className="max-w-2xl text-balance text-sm font-light leading-relaxed text-mist sm:text-base"
          >
            Bu yıl düzenlediğimiz gala gecesi; iş ortaklarımızı, ekiplerimizi
            ve sektörün öncü isimlerini bir araya getiriyor. Özenle
            kurgulanmış bir akış, seçkin bir mekân ve unutulmaz bir atmosfer
            sizi bekliyor.
          </p>
        </div>

        <div
          data-speed="0.95"
          className="grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="font-serif text-4xl text-gold sm:text-5xl">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-mist">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
