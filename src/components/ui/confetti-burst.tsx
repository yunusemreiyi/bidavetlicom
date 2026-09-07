"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#c9a45c", "#e4c98a", "#f5f3ee", "#8a7139"];

export function ConfettiBurst({ count = 32 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Deterministic pseudo-randomness derived from the index (no
        // Math.random) so the burst stays a pure render output.
        const jitter = Math.sin(i * 12.9898) * 0.5 + 0.5;
        const angle = (Math.PI * 2 * i) / count + jitter * 0.4;
        const distance = 120 + ((i * 37) % 140);
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 40,
          rotate: (i * 53) % 360,
          size: 5 + ((i * 7) % 6),
          color: COLORS[i % COLORS.length],
          delay: ((i * 11) % 15) / 100,
          duration: 1.1 + ((i * 13) % 40) / 100,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.4 }}
          animate={{
            opacity: 0,
            x: p.x,
            y: p.y,
            rotate: p.rotate,
            scale: 1,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size * 0.4,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}
