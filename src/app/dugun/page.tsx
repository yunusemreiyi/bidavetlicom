import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

// Düğün sitesi yayına alındığında NEXT_PUBLIC_WEDDING_SITE_URL ortam
// değişkenini o adrese ayarlayın; bu sayfa otomatik olarak oraya
// yönlendirir. Değişken tanımlı değilse aşağıdaki "yakında" ekranı gösterilir.
export default function DugunPage() {
  const weddingSiteUrl = process.env.NEXT_PUBLIC_WEDDING_SITE_URL;

  if (weddingSiteUrl) {
    redirect(weddingSiteUrl);
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-obsidian px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,164,92,0.1),_transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
          <Heart className="h-7 w-7" strokeWidth={1.5} />
        </span>

        <h1 className="font-serif text-4xl italic text-ivory sm:text-5xl">
          Düğün Davetiyemiz{" "}
          <span className="gold-shimmer not-italic">Yakında</span>
        </h1>

        <p className="max-w-md text-sm font-light leading-relaxed text-mist sm:text-base">
          Düğün davetiye sitemiz üzerinde çalışıyoruz. Çok yakında bu adres
          sizi doğrudan davetiyemize yönlendirecek.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-opacity hover:opacity-80"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
