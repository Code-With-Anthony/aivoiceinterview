import { auth, provider } from "@/firebase/client";
import { getCurrentUser, signIn } from "@/lib/actions/auth.action";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

export const handleGoogleAuth = async (router: any) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userDetails = await getCurrentUser();

    const idToken = await user.getIdToken();

    // Attempt to sign in
    const signInResult = await signIn({
      email: user.email!,
      idToken,
      authProvider: "google"
    });

    if (signInResult?.success === true) {
      toast.success("Signed in successfully!");
    }
    else {
      toast.error(signInResult.message);
      return;
    }

    if (userDetails?.role === "candidate") {
      router.psuh("/candidate");
    }
    else if (userDetails?.role === "recruiter") {
      router.push("/recruiter")
    }

  } catch (error) {
    console.error("Google Auth Error:", error);
    toast.error("Google sign-in failed");
  }
};
