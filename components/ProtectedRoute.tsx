"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/lib/store/useUserStore";

interface ProtectedRouteProps {
  allowedRoles: ("candidate" | "recruiter")[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const isRecruiter = user.role === "recruiter";
    const isCandidate = user.role === "candidate";
    const isVisitor = user?.role !== "recruiter" && user?.role !== "candidate";

    if (isVisitor) {
      router.push("/");
      return;
    }

    if (!allowedRoles.includes(user.role as "candidate" | "recruiter")) {
      router.push("/page-not-found");
      return;
    }

    // Recruiter trying to access non-recruiter route
    if (isRecruiter && !pathname.startsWith("/recruiter")) {
      router.replace("/recruiter/dashboard");
      return;
    }

    // Candidate trying to access recruiter route
    if (isCandidate && pathname.startsWith("/recruiter")) {
      router.replace("/");
      return;
    }
  }, [user, router, allowedRoles, pathname]);

  if (!user || !allowedRoles.includes(user.role as "candidate" | "recruiter"))
    return null;

  return <>{children}</>;
};

export default ProtectedRoute;
