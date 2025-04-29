import Navbar from "@/components/navbar/Navbar";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="pt-8 mt-8 md:pt-16 lg:pt-20">{children}</div>
    </div>
  );
};

export default RootLayout;
