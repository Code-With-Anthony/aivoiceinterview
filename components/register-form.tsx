"use client";

import { AUTH_BUTTON_TITLES, AuthProvider, ID_TOKEN_ERROR_SIGNIN, ROLE } from "@/constants";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { useUserStore } from "@/lib/store/useUserStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AuthButton from "./AuthButton";
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
    companyType: z
      .enum(["tech", "non-tech", "mixed"])
      .optional(), // Only required if role is recruiter
  }).refine(
    (data) => {
      return data.role !== "recruiter" || (data.companyType !== undefined && data.companyType !== null)
    },
    {
      message: "Please select company type",
      path: ["companyType"],
    }
  );

export function RegisterForm({ className }: React.ComponentProps<"form">) {
  const formSchema = getAuthFormSchema();
  const router = useRouter();
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(false); // Add this line

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
      companyType: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const { name, email, password, role, companyType } = values;

      // Dynamically building signUp payload
      const signupPayload: SignUpParams = {
        name,
        email,
        role: role as UserRole,
        authProvider: AuthProvider.EMAIL,
        password,
      };

      if (role === ROLE.RECRUITER && companyType) {
        signupPayload.companyType = companyType as CompanyType;
      }

      const result = await signUp(signupPayload);

      if (result.success) {
        setUser({
          id: result.userId as string,
          name: name as string,
          email: email as string,
          role: role as string,
          authProvider: AuthProvider.EMAIL,
        });
      }

      if (!result?.success) {
        toast.error(result?.message);
        return;
      }

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

      await signIn({
        email: email,
        idToken: idToken,
        authProvider: AuthProvider.EMAIL,
      });

      toast.success("Account created and signed in!");

      if (role === ROLE.CANDIDATE) {
        router.push("/dashboard");
      } else if (role === ROLE.RECRUITER) {
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
    } finally {
      setLoading(false);
    }
  };
  const role = form.watch("role");
  useEffect(() => {
    if (role !== ROLE.RECRUITER) {
      // Reset companyType if role is not recruiter
      form.setValue("companyType", undefined);
    }
  }, [role, form]);

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create New Account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Register seamlessly with just a few simple steps.
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
                    className={`w-full ${fieldState.error ? "border-red-500" : ""
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
          {form.watch("role") === "recruiter" && (
            <div className="grid gap-3">
              <FormField control={form.control} name="companyType" label="Company Type">
                {(field, fieldState) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`w-full ${fieldState.error ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="non-tech">Non-Tech</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </FormField>
            </div>
          )}

          <AuthButton
            title={AUTH_BUTTON_TITLES.REGISTER}
            onClick={form.handleSubmit(onSubmit)}
            loadingText="Registering...."
            variant="default"
            disabled={!form.formState.isValid}
            loading={loading}
          />
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
