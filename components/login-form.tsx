"use client";

import { useGoogleAuth } from "@/app/(auth)/_utils/google-auth";
import { Label } from "@/components/ui/label";
import { AUTH_BUTTON, AUTH_BUTTON_TITLES, AuthProvider, FIREBASE_ERROR, ID_TOKEN_ERROR_SIGNIN, INVALID_PASSWORD, ROLE, SUCCESS_MESSAGE } from "@/constants";
import { auth } from "@/firebase/client";
import { signIn } from "@/lib/actions/auth.action";
import { useUserStore } from "@/lib/store/useUserStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AuthButton from "./AuthButton";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { Form } from "./ui/form";

const getAuthFormSchema = () =>
  z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: INVALID_PASSWORD }),
  });

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const formSchema = getAuthFormSchema();
  const { handleGoogleAuth } = useGoogleAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (!values || !values.email || !values.password) {
        return;
      }

      const { email, password } = values;

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredentials.user.getIdToken();

      if (!idToken) {
        toast.error(ID_TOKEN_ERROR_SIGNIN);
        return;
      }

      const signInResult = await signIn({
        email: email,
        idToken: idToken,
        authProvider: AuthProvider.EMAIL,
      });

      if (signInResult.success === true) {
        toast.success(SUCCESS_MESSAGE.SIGNIN_SUCCESSFULL);
        setUser({
          id: userCredentials.user.uid,
          name: signInResult.user?.name,
          email: userCredentials.user.email!,
          role: signInResult.user?.role,
          authProvider: AuthProvider.EMAIL,
        });
      }

      // Reset the form before redirection
      form.reset();

      if (signInResult?.user?.role === ROLE.CANDIDATE) {
        router.push("/dashboard");
      } else if (signInResult?.user?.role === ROLE.RECRUITER) {
        router.push("/recruiter");
      }
    } catch (error: any) {
      if (error?.code === FIREBASE_ERROR.EMAIL_ALREAY_IN_USE.TITLE) {
        toast.error(FIREBASE_ERROR.EMAIL_ALREAY_IN_USE.MESSAGE);
        return;
      }
      if (error?.code === FIREBASE_ERROR.INVALID_CREDENTIALS.TITLE) {
        toast.error(FIREBASE_ERROR.INVALID_CREDENTIALS.MESSAGE);
        return;
      }

      if (error.code === FIREBASE_ERROR.TOO_MANY_ATTEMPTS.TITLE) {
        toast.error(
          FIREBASE_ERROR.TOO_MANY_ATTEMPTS.MESSAGE);
        return;
      }

      toast.error(error?.code);
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
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
            Enter your credentials to continue your journey
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
          <AuthButton
            title={AUTH_BUTTON_TITLES.LOGIN}
            onClick={form.handleSubmit(onSubmit)} // Pass form submit handler to onClick
            loadingText="Logging in..."
            variant="default"
            disabled={!form.formState.isValid}
            loading={loading}
          />
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <AuthButton
            title={AUTH_BUTTON_TITLES.LOGIN_WITH_GOOGLE}
            onClick={handleGoogleAuth}
            loadingText="Signing in with Google..."
          />
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="underline underline-offset-4">
            {AUTH_BUTTON.SIGNUP}
          </a>
        </div>
      </form>
    </Form>
  );
}
