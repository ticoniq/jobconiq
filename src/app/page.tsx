import Footer from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import Hero from "@/components/frontend/Hero";
import Category from "@/components/frontend/Category";
import { Pricing } from "@/components/frontend/pricing";
import { LogoClouds } from "@/components/frontend/LogoClouds";
import { CTASection } from "@/components/frontend/CTASection";
import Feature from "@/components/frontend/Feature";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <LogoClouds />
        <Category />
        <Pricing />
        <CTASection />
        <Feature />
      </main>
      <Footer />
    </>
  );
}
