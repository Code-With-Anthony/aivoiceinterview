"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";

type FormType = "sign-in" | "sign-up";

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      if (!isSignIn) {
        // Simulate Sign Up
        toast.success("Account created successfully! Please sign in.");
        console.log("Sign up values:", values);
        router.push("/sign-in");
      } else {
        // Simulate Sign In
        toast.success("Signed in successfully!");
        console.log("Sign in values:", values);
        router.push("/");
      }
    } catch (error) {
      toast.error(`There was an error: ${error}`);
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
