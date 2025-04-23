import Navbar from "@/components/Navbar";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");
  return (
    <div className="root-layout">
      <Navbar />
      <div className="pt-16 md:pt-20 lg:pt-24">{children}</div>
    </div>
  );
};

export default RootLayout;
