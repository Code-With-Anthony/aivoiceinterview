"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/useUserStore";

interface ProtectedRouteProps {
  allowedRoles: ("candidate" | "recruiter")[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (!allowedRoles.includes(user?.role)) {
      // Logged in, but role not allowed
      router.push("/unauthorized");
    }
  }, [user, router, allowedRoles]);

  if (!user) return null; // Or a loading spinner

  if (!allowedRoles.includes(user.role)) return null; // Hide content while redirecting

  return <>{children}</>;
};

export default ProtectedRoute;
