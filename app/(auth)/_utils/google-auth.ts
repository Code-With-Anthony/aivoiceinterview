import { auth, provider } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

export const handleGoogleAuth = async (router: any) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken();

    // Attempt to sign in
    const signInResult = await signIn({
      email: user.email!,
      idToken,
    });

    if (signInResult?.success === false) {
      // If sign-in fails, try to create a new user
      const signUpResult = await signUp({
        uid: user.uid,
        name: user.displayName!,
        email: user.email!,
        authProvider: "google",
      });

      if (signUpResult?.success) {
        toast.success("Account created successfully!");
      } else {
        toast.error(signUpResult.message || "Sign up failed");
        return;
      }
    } else {
      toast.success("Signed in successfully!");
    }

    router.push("/");
  } catch (error) {
    console.error("Google Auth Error:", error);
    toast.error("Google sign-in failed");
  }
};
