import { Hero } from "@/components/landing-page-components/hero";
import { CTA } from "@/components/landing-page-components/cta";
import { Features } from "@/components/landing-page-components/features";
import { Benefits } from "@/components/landing-page-components/benefits";
import { TechStack } from "@/components/landing-page-components/tech-stack";

import { LandingHeader } from "@/components/landing-page-components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 mt-20">
        <Hero />
        <Features />
        <Benefits />
        <TechStack />
        <CTA />
      </main>
    </div>
  );
}
