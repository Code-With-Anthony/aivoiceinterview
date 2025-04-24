"use client";

import { auth } from "@/firebase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const signOutUser = async () => {
      await auth.signOut(); // Firebase sign out (optional)
      await fetch("/api/logout", { method: "POST" }); // clears session cookie
      router.push("/sign-in");
    };

    signOutUser();
  }, [router]);

  return <p className="text-center mt-10">Signing you out...</p>;
};

export default SignOutPage;
