import PricingSection from "@/components/PricingSection";
import { ToogleMode } from "@/components/ToggleMode";
import React from "react";

const Pricing = () => {
  return (
    <div className="relative min-h-screen">
      {/* Toggle button placed at the top right */}
      <div className="absolute top-6 right-6">
        <ToogleMode />
      </div>
      <PricingSection />
    </div>
  );
};

export default Pricing;
