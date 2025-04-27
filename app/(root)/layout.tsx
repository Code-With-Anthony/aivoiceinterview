import Navbar from "@/components/Navbar/Navbar";
import { ReactNode } from "react";
// import { AuthListener } from "../(auth)/auth-listener";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="pt-4 mt-6 md:pt-2 lg:pt-4">
        {/* <AuthListener /> */}
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
