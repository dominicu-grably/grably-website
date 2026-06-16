import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Problem } from "@/components/sections/Problem";
import { ComplianceRisk } from "@/components/sections/ComplianceRisk";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { DemoForm } from "@/components/sections/DemoForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <ComplianceRisk />
        <HowItWorks />
        <Features />
        <Pricing />
        <DemoForm />
      </main>
      <Footer />
    </>
  );
}
