"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

gsap.registerPlugin(ScrollTrigger);

const program = [
  {
    time: "18:30",
    title: "Karşılama & Kokteyl",
    description: "Canlı müzik eşliğinde karşılama ve networking kokteyli.",
  },
  {
    time: "19:30",
    title: "Açılış Konuşması",
    description: "Yönetim kurulu tarafından yıl değerlendirmesi ve vizyon.",
  },
  {
    time: "20:15",
    title: "Gala Yemeği",
    description: "Seçkin bir menü eşliğinde akşam yemeği.",
  },
  {
    time: "21:30",
    title: "Ödül Töreni",
    description: "Yılın başarılarının kutlandığı ödül seremonisi.",
  },
  {
    time: "22:30",
    title: "Canlı Performans",
    description: "Özel konuk sanatçı performansı ve dans.",
  },
  {
    time: "00:00",
    title: "Kapanış",
    description: "Gecenin anılarla dolu şekilde kapanışı.",
  },
];

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Measure the track's overflow independently of ScrollTrigger creation so
  // web-font loading / late layout shifts can't leave the pin distance stale.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    document.fonts.ready.then(measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useLayoutEffect(() => {
    if (distance <= 0) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${distance}`,
          scrub: 1,
          pin: true,
          // main is a flex column, and GSAP disables auto pin-spacing by
          // default when the pinned element's parent is display:flex.
          pinSpacing: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [distance]);

  return (
    <section
      ref={sectionRef}
      id="program"
      className="relative h-screen overflow-hidden bg-obsidian-soft"
    >
      <div className="flex h-full flex-col justify-center gap-10 py-10">
        <div className="px-6 sm:px-16">
          <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
            Program Akışı
          </span>
          <h2 className="mt-3 font-serif text-3xl italic text-ivory sm:text-4xl">
            Gecenin <span className="gold-shimmer not-italic">akışı</span>
          </h2>
        </div>

        <div
          ref={trackRef}
          className="flex w-max gap-6 px-6 will-change-transform sm:gap-8 sm:px-16"
        >
          {program.map((item) => (
            <TiltCard key={item.time} className="w-[78vw] shrink-0 sm:w-[26rem]">
              <div className="flex items-center gap-2 text-gold">
                <Clock className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-serif text-2xl">{item.time}</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl text-ivory">
                {item.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-mist">
                {item.description}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
