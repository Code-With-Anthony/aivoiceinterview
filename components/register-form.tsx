"use client";

import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { useUserStore } from "@/lib/store/useUserStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { Form } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const getAuthFormSchema = () =>
  z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    role: z.enum(["candidate", "recruiter"], {
      required_error: "Please Select atleast one role",
    }),
  });

export function RegisterForm({ className }: React.ComponentProps<"form">) {
  const formSchema = getAuthFormSchema();
  const router = useRouter();
  const { setUser } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { name, email, password, role } = values;

      if (!name || !email || !password || !role) {
        toast.error("Please fill all the field");
        return;
      }

      const result = await signUp({
        name: name as string,
        email: email as string,
        role: role as UserRole,
        authProvider: "email",
        password: password,
      });

      if (result.success) {
        setUser({
          id: result.userId as string,
          name: name as string,
          email: email as string,
          role: role as string,
          authProvider: "email",
        });
      }

      if (!result?.success) {
        toast.error(result?.message);
        return;
      }

      await signIn({
        email: email as string,
        idToken: await result.idToke!,
      });

      toast.success("Account created and signed in!");

      if (role === "candidate") {
        router.push("/");
      } else if (role === "recruiter") {
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
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create New Account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="eg: Anthony Dourado"
            />
          </div>
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
            <PasswordField
              control={form.control}
              label="Password"
              placeholder="Enter Password"
              type="password"
              name="password"
              signUp={true}
            />
          </div>
          <div className="grid gap-3">
            <FormField control={form.control} name="role" label="Role">
              {(field, fieldState) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={`w-full ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate">Candidate</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </FormField>
          </div>
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <span className="loading-spinner">Please wait..</span>
            ) : (
              "Register"
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="underline underline-offset-4">
            Login
          </a>
        </div>
      </form>
    </Form>
  );
}
