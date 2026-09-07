"use client";

import { CalendarPlus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleCalendarUrl, icsDataUrl, outlookCalendarUrl } from "@/lib/calendar";

const EVENT = {
  title: "Kurumsal Etkinlik — bidavetli.com",
  description: "Kurumsal etkinliğimize bekleriz.",
  location: "The Grand Hall, İstanbul",
  start: new Date("2026-11-14T09:00:00"),
  end: new Date("2026-11-14T17:00:00"),
};

export function LocationSection() {
  return (
    <section id="konum" className="relative bg-obsidian py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
            Mekân
          </span>
          <h2 className="font-serif text-4xl italic text-ivory sm:text-5xl">
            The Grand Hall,{" "}
            <span className="gold-shimmer not-italic">İstanbul</span>
          </h2>
          <p className="max-w-md text-sm font-light leading-relaxed text-mist sm:text-base">
            Boğaz manzaralı, tarihi dokusuyla öne çıkan mekânımızda sizi
            ağırlamaktan onur duyarız. Vale hizmeti ve özel misafir girişi
            mevcuttur. Toplantı, organizasyon ve söyleşi formatındaki tüm
            etkinlikler için uygundur.
          </p>

          <div className="flex items-center gap-2 text-sm text-mist">
            <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
            Muallim Naci Cd. No:55, Beşiktaş / İstanbul
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-fit">
                <CalendarPlus className="h-4 w-4" strokeWidth={1.5} />
                Takvime Ekle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Takvime Ekle</DialogTitle>
                <DialogDescription>
                  Etkinliği tercih ettiğiniz takvim uygulamasına ekleyin.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3">
                <a
                  href={googleCalendarUrl(EVENT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-between rounded-md border border-line px-4 text-sm text-ivory transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  Google Takvim
                  <CalendarPlus className="h-4 w-4 text-gold" />
                </a>
                <a
                  href={outlookCalendarUrl(EVENT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-between rounded-md border border-line px-4 text-sm text-ivory transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  Outlook Takvim
                  <CalendarPlus className="h-4 w-4 text-gold" />
                </a>
                <a
                  href={icsDataUrl(EVENT)}
                  download="kurumsal-etkinlik.ics"
                  className="flex h-12 items-center justify-between rounded-md border border-line px-4 text-sm text-ivory transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  Apple Takvim (.ics)
                  <CalendarPlus className="h-4 w-4 text-gold" />
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(201,164,92,0.12),_rgba(9,10,15,0.9))]" />
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-40"
            viewBox="0 0 400 300"
            fill="none"
          >
            <path
              d="M0 220 L60 200 L120 230 L180 190 L240 210 L300 160 L400 190"
              stroke="#c9a45c"
              strokeWidth="1"
              opacity="0.4"
            />
            <path
              d="M0 120 L80 140 L150 100 L220 130 L280 90 L400 110"
              stroke="#c9a45c"
              strokeWidth="1"
              opacity="0.3"
            />
            <circle cx="220" cy="150" r="6" fill="#c9a45c" />
            <circle cx="220" cy="150" r="14" stroke="#c9a45c" strokeWidth="1" opacity="0.5" />
            <circle cx="220" cy="150" r="24" stroke="#c9a45c" strokeWidth="0.5" opacity="0.3" />
          </svg>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <MapPin className="h-8 w-8 text-gold drop-shadow-[0_0_12px_rgba(201,164,92,0.6)]" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
}
