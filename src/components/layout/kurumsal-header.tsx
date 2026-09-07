"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function KurumsalHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 sm:px-10">
      <Link href="/" className="font-serif text-xl italic text-ivory">
        bi<span className="gold-shimmer not-italic">davetli</span>
        <span className="text-gold">.com</span>
      </Link>
      <Button asChild size="sm" variant="outline">
        <a href="#lcv">Katılım Bildir</a>
      </Button>
    </header>
  );
}
