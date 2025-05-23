import { Navbar } from "@/components/Navbar/Navbar";
import { SessionValidator } from "@/components/SessionValidator";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SessionValidator />
      <Navbar />
      <div className="px-8">{children}</div>
    </div>
  );
};

export default RootLayout;
