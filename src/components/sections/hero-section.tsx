"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const CrystalScene = dynamic(
  () => import("@/components/canvas/crystal-scene").then((m) => m.CrystalScene),
  {
    ssr: false,
    loading: () => <CanvasSkeleton />,
  },
);

function CanvasSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-gold/10 blur-2xl sm:h-64 sm:w-64" />
    </div>
  );
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-obsidian px-6">
      <div className="absolute inset-0">
        <Suspense fallback={<CanvasSkeleton />}>
          <CrystalScene />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_rgba(9,10,15,0.6)_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_42%_at_50%_42%,_rgba(9,10,15,0.55),_transparent_72%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-6 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold"
        >
          Kurumsal Etkinlik Davetiyesi
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-balance font-serif text-5xl font-medium leading-[1.05] text-ivory sm:text-7xl lg:text-8xl"
        >
          Bir Gecelik <span className="gold-shimmer italic">Mükemmellik</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-xl text-balance text-sm font-light leading-relaxed text-mist sm:text-base"
        >
          Kurumumuzun yıllık gala gecesine katılımınızı bekliyoruz. Aşağıdan
          davetiyenin tüm ayrıntılarına ulaşabilir, katılımınızı bildirebilirsiniz.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Button asChild>
            <a href="#lcv">Katılım Bildir</a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#hakkinda"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-mist"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Keşfet</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
