import { LoginForm } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { AuthRightSideContent } from "../_utils/AuthRightSideContent";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 dark:bg-black">
      <div className="flex flex-col gap-4 p-6 md:p-10 items-center">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            AV! Inc.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <AuthRightSideContent page="login" />
      </div>
    </div>
  );
}
