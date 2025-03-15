
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import WhitepaperSection from "@/components/home/WhitepaperSection";
import UnimetrixTokenSection from "@/components/home/UnimetrixTokenSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TechnicalSpecsSection from "@/components/home/TechnicalSpecsSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import CallToActionSection from "@/components/home/CallToActionSection";

const HomePage = () => {
  return (
    <MainLayout fullWidth>
      <HeroSection />
      <WhitepaperSection />
      <UnimetrixTokenSection />
      <FeaturesSection />
      <TechnicalSpecsSection />
      <SustainabilitySection />
      <CallToActionSection />
    </MainLayout>
  );
};

export default HomePage;
