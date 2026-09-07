import Link from "next/link";

export function KurumsalFooter() {
  return (
    <footer className="border-t border-line bg-obsidian px-6 py-10 text-center text-xs text-mist sm:px-10">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link href="/" className="text-gold">
          bidavetli.com
        </Link>{" "}
        — Tüm hakları saklıdır.
      </p>
    </footer>
  );
}
