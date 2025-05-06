import { Navbar } from "@/components/Navbar/Navbar";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="px-8">{children}</div>
    </div>
  );
};

export default RootLayout;
