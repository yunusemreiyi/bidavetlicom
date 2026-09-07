import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { KurumsalHeader } from "@/components/layout/kurumsal-header";
import { KurumsalFooter } from "@/components/layout/kurumsal-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { LocationSection } from "@/components/sections/location-section";
import { RsvpSection } from "@/components/sections/rsvp-section";

export const metadata: Metadata = {
  title: "Kurumsal Davet & LCV — bidavetli.com",
  description:
    "Kurumsal etkinliğimize davetlisiniz. Program akışını, mekân bilgisini inceleyin ve katılımınızı bildirin.",
};

export default function KurumsalPage() {
  return (
    <SmoothScroll>
      <KurumsalHeader />
      <main className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <LocationSection />
        <RsvpSection />
      </main>
      <KurumsalFooter />
    </SmoothScroll>
  );
}
