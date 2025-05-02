"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/recruiter")) redirect("/recruiter/dashboard");
  }, [pathname]);
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
