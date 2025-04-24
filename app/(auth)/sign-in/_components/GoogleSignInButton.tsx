"use client";

import { Button } from "@/components/ui/button";
import { auth, provider } from "@/firebase/client";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function GoogleSignInButton() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Optional: call a backend function to create a user record
      await fetch("/api/auth/create-user", {
        method: "POST",
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        }),
      });

      toast.success("Signed in successfully");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outline"
      className="!w-full gap-2 p-6"
    >
      <Image src="/Icons/Google.svg" alt="Google" width={30} height={30} />
      Continue with Google
    </Button>
  );
}
