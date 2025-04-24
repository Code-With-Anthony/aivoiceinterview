import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { ToogleMode } from "@/components/ToggleMode";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect("/");

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Right Side (Toggle Mode) */}
      <div className="flex justify-end p-7 md:p-8 md:absolute md:top-8 md:right-8 z-10">
        <ToogleMode />
      </div>

      {/* Main Content */}
      <div className="auth-layout flex-1">{children}</div>
    </div>
  );
};

export default AuthLayout;
