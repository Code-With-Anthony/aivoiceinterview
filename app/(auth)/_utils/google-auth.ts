"use client";
import { useUserStore } from "@/lib/store/useUserStore";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/client";
import { toast } from "sonner";
import { getCurrentUser, signIn } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";

export const useGoogleAuth = () => {
  const { setUser } = useUserStore(state => state);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user) {
        toast.error("Google sign-in failed: No user data");
        return;
      }

      const userDetails = await getCurrentUser();
      const idToken = await user.getIdToken();

      // Attempt to sign in
      const signInResult = await signIn({
        email: user.email!,
        idToken,
        authProvider: "google"
      });

      if (signInResult?.success === true) {
        setUser({
          id: signInResult?.user?.uid,
          name: signInResult?.user?.name,
          email: signInResult?.user?.email,
          role: signInResult?.user?.role,
          authProvider: "google",
        });
        toast.success("Signed in successfully!");
      } else {
        toast.error(signInResult.message);
        return;
      }

      if (userDetails?.role === "candidate") {
        router.push("/candidate");
      } else if (userDetails?.role === "recruiter") {
        router.push("/recruiter");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error("Google sign-in failed");
    }
  };

  return { handleGoogleAuth };
};
