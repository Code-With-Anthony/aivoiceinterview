"use client";
import { useEffect } from "react";
import { useUserStore } from "@/lib/store/useUserStore";

export const SessionValidator = () => {
  const { user, clearUser, hasHydrated } = useUserStore();

  useEffect(() => {
    if (!hasHydrated) return;

    const validateSession = async () => {
      try {
        const res = await fetch("/api/validate-session");
        const isValid = await res.json();

        console.log("Session valid:", isValid);
        if (!isValid && user) {
          console.log("Clearing invalid session...");
          clearUser();
        }
      } catch (error) {
        console.error("Session validation error:", error);
        if (user) clearUser(); // fallback
      }
    };

    validateSession();
  }, [hasHydrated]);

  return null;
};
