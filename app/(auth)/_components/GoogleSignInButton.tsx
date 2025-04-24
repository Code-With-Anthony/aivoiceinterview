"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleGoogleAuth } from "../_utils/google-auth";

export const GoogleSignInButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => handleGoogleAuth(router)}
      variant="outline"
      className="!w-full gap-2 p-6"
    >
      <Image src="/Icons/Google.svg" alt="Google" width={30} height={30} />
      Continue with Google
    </Button>
  );
};
