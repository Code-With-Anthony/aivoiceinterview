"use client";

import { useGoogleAuth } from "@/app/(auth)/_utils/google-auth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/client";
import { signIn } from "@/lib/actions/auth.action";
import { useUserStore } from "@/lib/store/useUserStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { Form } from "./ui/form";

const getAuthFormSchema = () =>
  z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Invalid Password" }),
  });

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const formSchema = getAuthFormSchema();
  const { handleGoogleAuth } = useGoogleAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { email, password } = values;

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredentials.user.getIdToken();

      if (!idToken) {
        toast.error("Error signing in. Please try again.");
        return;
      }

      const signInResult = await signIn({
        email: email,
        idToken: idToken,
        authProvider: "email",
      });

      if (signInResult.success === true) {
        toast.success("Signed in successfully!");
        setUser({
          id: userCredentials.user.uid,
          name: signInResult.user?.name,
          email: userCredentials.user.email!,
          role: signInResult.user?.role,
          authProvider: "email",
        });
      }

      // Reset the form before redirection
      form.reset();

      if (signInResult?.user?.role === "candidate") {
        router.push("/dashboard");
      } else if (signInResult?.user?.role === "recruiter") {
        router.push("/recruiter");
      }
    } catch (error: any) {
      if (error?.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please sign in.");
        return;
      }
      if (error?.code === "auth/invalid-credential") {
        toast.error("Invalid Credentials");
        return;
      }

      if (error.code === "auth/too-many-requests") {
        toast.error(
          "Too many failed attempts. Please wait a few minutes and try again."
        );
        return;
      }

      toast.error(error?.code);
      console.error("Error signing in:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="eg: anthony@provider.com"
              type="email"
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <PasswordField
              control={form.control}
              placeholder="Enter Password"
              type="password"
              name="password"
              signUp={false}
            />
          </div>
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <span className="loading-spinner">Please wait..</span>
            ) : (
              "Login"
            )}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleGoogleAuth}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            Login with Google
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </Form>
  );
}
