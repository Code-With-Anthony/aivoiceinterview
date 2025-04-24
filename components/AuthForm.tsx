"use client";

import { GoogleSignInButton } from "@/app/(auth)/_components/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

const getAuthFormSchema = (type: FormType) =>
  z.object({
    name:
      type === "sign-up"
        ? z
            .string()
            .min(3, { message: "Name must be at least 3 characters long" })
        : z.string().optional(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const isSignIn = type === "sign-in";
  const router = useRouter();
  const formSchema = getAuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!isSignIn) {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email: email,
          password: password,
          authProvider: "email",
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        const idToken = await userCredentials.user.getIdToken();
        await signIn({
          email,
          idToken,
        });

        toast.success("Account created and signed in!");
        router.push("/");
      } else {
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

        await signIn({
          email: email,
          idToken: idToken,
          authProvider: "email",
        });

        toast.success("Signed in successfully!");
        router.push("/");
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
    <div className="card-border lg:min-w-[566px]">
      <Card className="card flex flex-col gap-6 py-14 px-10 rounded-2xl">
        <div className="text-center gap-2">
          <h2 className="text-primary dark:text-[color:hsl(256,91%,58%)]">
            AV!
          </h2>
          <p className="font-mona-sans mt-2">
            Your Path to Confident Interviewing Starts Here.
          </p>
        </div>

        <div className="max-w-md mx-auto w-full">
          <GoogleSignInButton />
        </div>
        <div className="flex items-center gap-4 w-full">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">
            or continue with
          </span>
          <Separator className="flex-1" />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="form w-full mt-4 space-y-6"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
            />
            {/* <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
            /> */}
            <PasswordField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
              signUp={!isSignIn}
            />

            <Button type="submit" className="btn">
              {form.formState.isSubmitting
                ? "Please wait..."
                : isSignIn
                ? "Sign In"
                : "Create an Account"}
            </Button>
          </form>

          {/* Toggle Link */}
          <p className="text-center">
            {isSignIn ? "No account yet?" : "Already have an account?"}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="ml-1 font-bold text-user-primary"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default AuthForm;
