"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormField from "./FormField";

// Schema generator based on form type
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
        // Simulate Sign Up

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
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully! Please sign in.");
        console.log("Sign up values:", values);
        router.push("/sign-in");
      } else {
        // Simulate Sign In

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
        });

        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (error: any) {
      if (error?.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please sign in.");
        return;
      }
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="card flex flex-col gap-6 py-14 px-10">
        {/* Logo and Heading */}
        <div className="flex justify-center items-center gap-2">
          <Image src="/DarkAVILogo.png" width={38} height={38} alt="logo" />
          <h2 className="text-primary-100">AI Voice Interview</h2>
        </div>

        <h3 className="text-center">Practice Job Interviews With AI</h3>

        {/* Form */}
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
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
            />

            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an Account"}
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
      </div>
    </div>
  );
};

export default AuthForm;
